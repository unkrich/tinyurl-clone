# unkri.ch URL Shortener

The purpose of this project is to build a personal URL shortener for Kevin Unkrich.

### Setup

* Install MongoDB and start it `brew install mongodb && mongo`
* Install react dependencies and start it `cd client && yarn install && yarn start`
* Install node/express dependencies and start it `cd server && yarn install && node index.js`
* Navigate to localhost:3000

## Requirements and Goals

#### Functional Requirements
1. Given a URL, the service generates a short and unique version of it called a "short link".
2. When users access the short link, the service should redirect them to the original link.
3. Users should optionally be able to pick a custom short link for their URL.
4. Links will expire after a standard default timespan or at a user-specified time.

#### Non-Functional Requirements
1. The system should be highly available such that links will always work.
2. Minimal latency.
3. Unpredictable link generation.

#### Extended Requirements Include
1. Analytics. 
	* How many times has a redirection for a specific short link occurred
	* Country of the visitor
	* Date and time of access
	* Web page referral
	* Browser/platform for access

## Capacity Estimation and Constraints
By nature, this system should be read-heavy as there will be many redirection requests compared to short link URL generations.

While this is a personal project/service, and we can estimate that traffic and storage will be nominal as such, I'll take a look anyway.

#### Traffic estimates
We might assume ~ 40M new URL shortenings per month with a normal service, but here I can't imagine shortening any where near 1,000 links so I will use this as a base.

Perhaps we will have about 100 redirections per link per month, and as such can expect that we would have 100 * 1,000 = 100,000 redirections on a monthly basis maximum.

Our URL short link generation per second would be:
1,000 / (30 days * 24 hours * 3600 seconds) = 0.000386

Our redirections per second for the system would then be:
100,000 / (30 days * 24 hours * 3600 seconds) = .0386 redirections/second

As we can see, these are very low numbers so I don't expect problems here with a private service.

#### Storage Estimates
Assuming that I store short links for 10 years on average, and expect to have 1K new URLs each month, the total number of URLs we might store would be
10k * 10 years * 12 months = 1,200,000

Assuming as well that each object/URL will take approximately 500 bytes, we will need 1.2M * 500 bytes = 0.6 GB. Again, a trivial amount of storage.

#### Bandwidth Estimates
Expecting that our write request per second is 0.000386, our write bandwidth would be approximately 500 bytes * 0.000386 = 0.193 bytes/second.

Expecting that our read reqeust per second is 0.0386, our read bandwidth would be 500 bytes * 0.0386 = 19.3 bytes/second.

#### Memory Estimates
In the event that we want to cache some of the URLs that are frequently accessed, and assuming about 20% of the URLs make up the majority of the traffic:

0.0386 redirections/second * 3600 seconds * 24 hours = ~ 3,335 requests/day

To cache 20% of these, we need:
0.2 * 3,335 requests/day * 500 bytes = 333.5 KB

#### Estimate Summary
Because it is unlikely that the service will be used highly to generate and send short links, I will assume the numbers used above are already high level estimates.

* New URLs: 0.000386/second
* URL redirections: 0.0386/second
* Incoming data: 0.193 bytes/second
* Outgoing Data: 19.3 bytes/second
* Storage for 10 years: 0.6 GB
* Cache Memory: 333.5 KB

## System APIs

API endpoints that we might expose include:
* createURL(api_dev_key, original_url, custom_alias=None, user_name=None, expire_date=None)
* deleteURL(api_dev_key, url_key)

Because I don't currently have a need to expose these URLs beyond the site, the implementation of api keys will be left out for now.

## Database Design

Considering that we want to store data that has the properties of:
* Large number of records
* Each Object is small
* Minimal relationships between records
* Read-heavy

it seems that the best database for this would be a NoSQL key-value store (like Dynamo or, as used in this case, MongoDB).

#### Database Schema
At a basic implementation level, I expect the database schema to look similar to:

- URL
	- PK: \_id: String
	- userId: String
	- originalUrl: String, required: true
	- title: String
	- numVisits: Number, default: 0
	- expiresAt: Date, default: Date.now + 10 Years
	- createdAt: Date, default: Date.now
	- updatedAt: Date, default: Date.now

- User
	- hash: String, required: true
	- firstName: String
	- lastName: String
	- email: String, required: true
	- lastLogin: Date, default: Date.now
	- createdAt: Date, default: Date.now

## Basic Design & Algorithm
 Using MD5, SHA256, etc, we can compute a unique hash of the given URL. We can then ecode that hash for displaying. We could also use base36, base62, or bas64 encoding. 

 A quick breakdown of the number of possible strings include:
 * Base32, 5 letters, 32^5: ~ 33M
 * Base32, 6 letters, 32^6: ~ 1.07B
 * Base32, 8 letters, 32^8: ~ 1.09B
 * Base62, 6 letters, 62^6: ~ 56.8B
 * Base62, 8 letters, 62^6: ~ 21.8B
 * Base64, 6 letters, 64^6: ~ 68.7B
 * Base64, 8 letters, 64^8: ~ 281T

Considering the number of URLs I expect to generate would be 1.2M, I'm going to keep it simple, short, and not case-sensitive, and go with Base32, 5 letters.

TODO: Hash function details.

## Data Partitioning and Replication

While not strictly necessary for a short link generator of this size, it may be interesting to implement hash-based partitioning/consistent hashing. In this case, I've determined not to include it in this simple project.

## Cache

Similarly, at this scale, cache may not be strictly necessary, but the implementation may be interesting and useful.

In this case, I think a local version of redis and implementation into this project is interesting enough and related enough to include. Refer to resources for implementation details.

## Load Balancer

At this scale, a load balancer may not be strictly necessary, but the implementation may be interesting and useful. Setting this up via a Classic Load Balancer on AWS or similar is easy enough so I've chosen to leave this out of the repository - though a cloudformation template may be useful.

## DB Cleanup

Considering that there is an expiration time with each link, we need a way to handle this. The expected implementation is to do a lazy cleanup.

## Security and Permissions

All URL shortlinks are to be accessible by anyone. The creation and modification of a specific alias for a shortlink will only be possible by the first registrant unless they delete it completely to release it for use by others.

Therefore, all users will need to sign up/sign in. I would like to add the option to quickly paste a link in and persist it without being signed in, though. Currently this is handled as: if you are not signed in, the URL is showed as recently registered to everyone.

## Resources Used
* [NodeJS/Express/MongoDB API Stack](https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/)
* [System Design Thoughts](https://medium.com/@adhasmana/system-design-create-a-url-shortening-service-part-2-design-the-write-api-6197c1e0aa1c)
* [Authentication](http://jasonwatmore.com/post/2018/06/14/nodejs-mongodb-simple-api-for-authentication-registration-and-user-management)
* [Using AWS DocumentDB](https://medium.com/@cmani/get-going-with-amazon-documentdb-4f547bcbefc8)
* [Deploying NodeJS on AWS](https://hackernoon.com/tutorial-creating-and-managing-a-node-js-server-on-aws-part-2-5fbdea95f8a1)
* [Caching](https://www.compose.com/articles/api-caching-with-redis-and-nodejs/)

## Technologies Used
* HTML/CSS, JavaScript & Bootstrap
* NodeJS, ExpressJS, ReactJS, Redis, MongoDB

