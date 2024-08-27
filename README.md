# Land Holdings Management System

## Overview

The Land Holdings Management System is a web-based application that allows users to manage owners and land holdings information. This system provides features for user authentication and owner and land holding management The application is built using Vue.js for the frontend, Express.js for the backend, and MongoDB for the database. Apart of the Phoenix Capital Group Capital Assessment.

## Features

1. **User Authentication**: Users can sign up and log in using their email and password.
2. **CRUD Operations on Owners**: Authenticated users can create, read, update, and delete owner records.
   - Deleting an owner will also delete all related land holdings.
   - The system prevents duplicate owners with the same name and address.
3. **CRUD Operations on Land Holdings**: Authenticated users can manage land holdings associated with an owner.
4. **File Uploads - IN PROGRESS**: Users can upload files for owners or land holdings. Uploaded files are viewable by authenticated users.

## Data Model

### Owner
- `ownerName`: String, required
- `entityType`: String, required (Options: "Company", "Individual", "Investor", "Trust")
- `ownerType`: String, required (Options: "Competitor", "Seller", "Investor", "Professional")
- `address`: String, required
- `totalNumberOfLandHoldings`: Number, optional (auto-calculated based on associated land holdings)

### Land Holding
- `name`: String, required (A combination of `sectionName` and `legalEntity`)
- `owner`: ObjectId, required (Reference to the associated Owner)
- `legalEntity`: String, required
- `netMineralAcres`: Number, required
- `mineralOwnerRoyalty`: Number, required (in percentage)
- `sectionName`: String, required (Format: Section-Township-Range)
- `section`: String, required (3 characters, numbers only)
- `township`: String, required (4 characters, starts with 3 numbers, ends in 'N' or 'S')
- `range`: String, required (4 characters, starts with 3 numbers, ends in 'E' or 'W')
- `titleSource`: String, required (Options: "Class A", "Class B", "Class C", "Class D")

## API Endpoints

### Auth
- POST /api/auth/register: Register a new user.
-POST /api/auth/login: Log in an existing user.

### Owners
-GET /api/owners: Get all owners.
-GET /api/owners/:id: Get a single owner by ID.
-POST /api/owners: Create a new owner.
-PUT /api/owners/:id: Update an owner by ID.
-DELETE /api/owners/:id: Delete an owner by ID.

### Land Holdings
-GET /api/landholdings: Get all land holdings.
-GET /api/landholdings/:id: Get a single land holding by ID.
-POST /api/landholdings: Create a new land holding.
-PUT /api/landholdings/:id: Update a land holding by ID.
-DELETE /api/landholdings/:id: Delete a land holding by ID.
