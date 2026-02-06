# API Documentation

Backend API for SPE UP SC Admin Dashboard with Supabase + Prisma.

## Base URL
```
http://localhost:3000/api
```

## Authentication
Currently, all endpoints are accessible without authentication. In production, implement Supabase Auth middleware.

---

## Dashboard Endpoints

### GET /dashboard/stats
Get aggregated statistics for dashboard.

**Response:**
```json
{
  "stats": [
    {
      "id": 1,
      "title": "Total Articles",
      "value": 42,
      "change": "+12.5%",
      "trend": "up",
      "icon": "FileText",
      "color": "blue"
    }
  ]
}
```

### GET /dashboard/activities
Get recent activities log.

**Response:**
```json
{
  "activities": [
    {
      "id": "uuid",
      "type": "article",
      "title": "New article published...",
      "user": "Dr. Sarah Johnson",
      "timestamp": "2 hours ago"
    }
  ]
}
```

---

## Upload Endpoints

### POST /upload
Upload image to Supabase Storage.

**Request:** `multipart/form-data`
- `file`: Image file (max 5MB, jpg/png/webp/gif)

**Response:**
```json
{
  "url": "https://..."
}
```

**Errors:**
- 400: No file / Invalid type / Too large
- 500: Upload failed

---

## Articles Endpoints

### GET /articles
List articles with filtering and pagination.

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 10)
- `search` (search in title, author, tags)
- `status` (draft/published/archived)
- `categoryId` (filter by category)
- `sortBy` (default: createdAt)
- `sortOrder` (asc/desc, default: desc)

**Response:**
```json
{
  "articles": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 42,
    "totalPages": 5
  }
}
```

### POST /articles
Create new article.

**Request Body:**
```json
{
  "title": "Article Title",
  "excerpt": "Brief description",
  "content": "<h2>Rich HTML content</h2>",
  "coverImage": "https://...",
  "author": "Author Name",
  "status": "draft",
  "categoryId": "uuid",
  "tags": ["tag1", "tag2"]
}
```

**Required:** `title`, `content`, `author`

**Response:** `{ "article": {...} }` (201)

### GET /articles/:id
Get single article by ID.

**Response:** `{ "article": {...} }`

### PUT /articles/:id
Update article.

**Request Body:** Same as POST (all fields optional)

**Response:** `{ "article": {...} }`

### DELETE /articles/:id
Delete article and its cover image.

**Response:** `{ "message": "Article deleted successfully" }`

---

## Categories Endpoints

### GET /articles/categories
List all categories with article counts.

**Response:**
```json
{
  "categories": [
    {
      "id": "uuid",
      "name": "Technology",
      "slug": "technology",
      "color": "#3B82F6",
      "_count": { "articles": 12 }
    }
  ]
}
```

### POST /articles/categories
Create category.

**Request:**
```json
{
  "name": "Category Name",
  "color": "#3B82F6"
}
```

**Response:** `{ "category": {...} }` (201)

### PUT /articles/categories
Update category.

**Request:**
```json
{
  "id": "uuid",
  "name": "New Name",
  "color": "#FF0000"
}
```

**Response:** `{ "category": {...} }`

### DELETE /articles/categories?id=uuid
Delete category (fails if has articles).

**Response:** `{ "message": "Category deleted successfully" }`

---

## Partnerships Endpoints

### GET /partnerships
List partnership applications.

**Query Parameters:**
- `page`, `limit` (pagination)
- `status` (pending/approved/rejected)
- `type` (partnership type)
- `search` (company name or contact person)

**Response:**
```json
{
  "partnerships": [...],
  "pagination": {...}
}
```

### POST /partnerships
Create partnership application.

**Request:**
```json
{
  "companyName": "Company Ltd",
  "companyEmail": "info@company.com",
  "companyPhone": "+62...",
  "contactPerson": "John Doe",
  "contactEmail": "john@company.com",
  "contactPhone": "+62...",
  "partnershipType": "collaboration",
  "description": "We would like to..."
}
```

**Required:** `companyName`, `companyEmail`, `contactPerson`, `contactEmail`, `partnershipType`

### GET /partnerships/:id
Get partnership details.

### DELETE /partnerships/:id
Delete partnership.

---

## Alumni Endpoints

### GET /alumni
List alumni records.

**Query Parameters:**
- `page`, `limit` (pagination)
- `search` (name, email, company)
- `year` (graduation year)

**Response:**
```json
{
  "alumni": [...],
  "pagination": {...}
}
```

### POST /alumni
Add alumni record.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "graduationYear": 2020,
  "major": "Petroleum Engineering",
  "currentCompany": "Chevron",
  "currentPosition": "Engineer",
  "location": "Jakarta",
  "phone": "+62...",
  "linkedIn": "linkedin.com/in/johndoe",
  "bio": "Alumni bio..."
}
```

**Required:** `name`, `email`, `graduationYear`

### GET /alumni/:id
Get alumni details.

### DELETE /alumni/:id
Delete alumni record.

---

## Error Responses

All endpoints may return:
```json
{
  "error": "Error message"
}
```

Common status codes:
- 400: Bad Request (validation error)
- 404: Not Found
- 500: Internal Server Error
