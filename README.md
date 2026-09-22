# Well Production Monitoring Dashboard

## Overview

A multi-page analytics dashboard for oil & gas well production data.

The application provides:

- Production trends at field and well level
- Actual production vs production target
- Top-performing and underperforming wells
- Well-level production data with sorting, filtering and pagination
- User management with role-based access control (RBAC)
- Task creation, assignment and tracking
- Responsive layouts for mobile, tablet, desktop and large screens
- Loading, error and empty states where applicable

## Links

- [Live Demo](https://well-dashboard.onrender.com/)
- [GitHub Repository](https://github.com/arjit03/well-production-monitoring-dashboard)

## Pages

- `/login` — Demo sign-in
- `/dashboard` — Field production overview, production trends, actual vs target comparison, and well performance
- `/wells` — Well production trends and tabular well data
- `/tasks` — Task management and assignment
- `/users` — User and role management (admin only)

## Role-Based Access

| Role    | Access                                                                   |
| ------- | ------------------------------------------------------------------------ |
| Admin   | Dashboard, Wells, Tasks, Users; can manage users and tasks               |
| Analyst | Dashboard, Wells, Tasks; can manage tasks                                |
| Viewer  | Dashboard, Wells, Tasks; can view assigned tasks and update their status |

## Demo Credentials

| Role    | Email                 | Password     |
| ------- | --------------------- | ------------ |
| Admin   | `admin@example.com`   | `admin123`   |
| Analyst | `analyst@example.com` | `analyst123` |
| Viewer  | `viewer@example.com`  | `viewer123`  |

## Tech Stack

- Next.js 16.3.5 — React, App Router, JavaScript
- Tailwind CSS
- shadcn/ui with Radix primitives
- ECharts — production/target trends over time
- Highcharts — field-level production vs target comparison
- AG Grid — well production data table
- PapaParse — CSV parsing

## Data

The dashboard uses `src/data/frontend_sample_data.csv` provided with the assignment.

The application:

- Reads and parses the CSV data
- Handles missing or invalid numeric values as unavailable data
- Uses the latest available timestamp for dashboard KPIs and current well/field performance
- Aggregates production and target values by field and well
- Calculates production achievement against target

## Local Setup

### Requirements

- Node.js 22.20.0
- npm

### Clone the repository

```bash
git clone https://github.com/arjit03/well-production-monitoring-dashboard.git
cd well-production-monitoring-dashboard
```

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open `http://localhost:3000`.

### Production build

```bash
npm run build
npm start
```

## Docker

### Build the image

```bash
docker build -t well-production-monitoring-dashboard .
```

### Run the container

```bash
docker run --rm -p 3000:3000 well-production-monitoring-dashboard
```

Open `http://localhost:3000`.

The Docker image uses the Next.js standalone build and includes the CSV dataset required at runtime.

## Assumptions

- This is a frontend-only implementation. Authentication, user management and task management use demo data and browser `localStorage`; there is no backend or database.
- The supplied CSV is the source of truth for production data.
- For dashboard KPIs and current performance views, the latest timestamp available in the dataset is used.
- Production targets with missing, zero, or negative values are excluded from target-based calculations and achievement percentages.
- The provided dataset contains oil production measurements and does not include separate gas production data. Gas-specific analytics are therefore not included in the dashboard.
