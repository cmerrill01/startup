# Notes

## Git and Github

### 11 January 2024

Main purposes of using GitHub:
- Preserve your work
- Enable exploration
- Build a portfolio
- Collaborate with other users
- Prove your work
- Obtain experience with the industry standard

A merge becomes necessary when two contributors edit and commit changes to the same line of code.

Forking a repository, making changes, and submitting a pull request is a useful way to contribute to open-source projects.

Four-step process for using git:
1. Pull to get the most up-to-date code
2. Work on a small piece of code to implement something cohesive
3. Commit and push
4. Repeat

## AWS

### 19 January 2024

IP Address: `3.92.129.185`

To ssh into server: `ssh -i [key pair file] ubuntu@[ip address]` or `ssh - i [key pair file] ubuntu@[domainname]`

Root Domain: `chasemerrill-startup.click`

## HTTPS

### 22 January 2024

Caddy is a service that "serves up" files using HTTPS.

HTTPS uses TLS technology to perform a "handshake". It verifies whether the web certificate provided by the server is legitimate.

## Exam review

Types of DNS records:
- `A`: Address - maps to an IP address
- `CNAME`: an alias - maps to a different DNS record
- `SOA`: important information about the owner of the record
- `TXT`: maps to text - used for Google analytics

In arrow function syntax, if you declare a function on a single line, you don't need an explicit return statement. However, if you put the argument in parentheses, you do need a return statement.

Some important console commands:
- `ls -la`: list all files in the directory using long format (including hidden files)
- `chmod`: change the permissions on a file (this includes read, write, and execute permissions for users, group members, and all others)
- `ssh`: secure shell: securely access a server (usually as an administrator) over a secure network

## Web Services

### 29 February 2024

Layers of an internet connection:

Layer        | Example          | Purpose
-------------|------------------|--------------------------------------
Application  | HTTPS            | Functionality like web browsing
Transport    | TCP              | Moving connection information packets
Internet     | IP               |	Establishing connections
Link         | Fiber, hardware  |	Physical connections
