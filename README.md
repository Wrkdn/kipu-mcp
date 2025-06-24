# Kipu MCP Server

[![npm version](https://badge.fury.io/js/kipu-mcp.svg)](https://www.npmjs.com/package/kipu-mcp)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A Model Context Protocol (MCP) server that provides seamless integration with the [Kipu API](https://api.kipuapi.com/api-docs/index.html). This server enables AI assistants and applications to access comprehensive healthcare data including patient records, vital signs, medications, appointments, and more through a secure, standardized interface.

## 🏥 About Wrkdn

This MCP server is brought to you by **[Wrkdn](https://wrkdn.com/)** - the leading platform for AI-powered healthcare compliance and revenue optimization.

### Why Healthcare Providers Choose Wrkdn:

- **📈 Increase Revenue**: Find missed billing opportunities and boost insurance reimbursements
- **🛡️ Ensure Compliance**: Automated protocol tracking reduces regulatory risk by up to 40%
- **⚡ Real-time Monitoring**: AI-powered oversight of clinical protocols and documentation
- **🎯 Prevent Errors**: Proactive alerts help staff maintain compliance before issues escalate

> *"Ensuring clinical compliance isn't just about avoiding penalties — it's about protecting patients and supporting frontline staff. Wrkdn's proactive approach is a game-changer."*  
> **- Joel N.H. Stern, PhD, Professor of Neurology, Zucker School of Medicine**

[Request a Demo](https://www.wrkdn.com/request-a-demo) | [Learn More](https://wrkdn.com)

---

## 🚀 Quick Start

Run the MCP server:

```bash
npx kipu-mcp
```

Or programmatically:

```javascript
const { spawn } = require('child_process');

const mcpServer = spawn('npx', ['kipu-mcp'], {
  env: {
    ...process.env,
    KIPU_ACCESS_ID: 'your_access_id',
    KIPU_SECRET_KEY: 'your_secret_key',
    KIPU_APP_ID: 'your_app_id'
  }
});
```

## 🔧 Configuration

### Required Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `KIPU_ACCESS_ID` | Your Kipu API access identifier | ✅ |
| `KIPU_SECRET_KEY` | Secret key for HMAC signature generation | ✅ |
| `KIPU_APP_ID` | Application ID for your Kipu integration | ✅ |

### Getting API Credentials

To obtain your Kipu API credentials:

1. Contact Kipu Systems to set up your healthcare integration
2. Request API access for your healthcare facility
3. Receive your `ACCESS_ID`, `SECRET_KEY`, and `APP_ID`

## 📚 Available Tools

The Kipu MCP server provides access to a comprehensive set of healthcare data endpoints:

### 👥 Patient Management
- **GetPatientsCensus** - List all patients from a census of the database
- **GetPatientsLatest** - List patients with updated_at within a date range
- **GetPatientsOccupancy** - Occupancy
- **GetPatientsByPatientId** - Fetch a Patient Record
- **GetVaultsPatients** - Lists all soft-deleted patients
- **GetPatientsCareTeam** - List a patient's care team
- **GetPatientsCareTeams** - List all patients' care teams

### 💊 Clinical Data & Medications
- **GetPatientsMedications** - List medications for a specific patient
- **GetMedications** - List all medications
- **GetPatientsAllergies** - List allergies scoped to a patient
- **GetAllergens** - List all allergens
- **GetAllergies** - List all allergies
- **GetPatientsDiagnoses** - List diagnoses for a specific patient
- **GetDiagnoses** - List all diagnoses
- **GetPatientsDiagnosisHistory** - List a patient's diagnosis history

### 🩺 Vital Signs & Clinical Assessments
- **GetPatientsVitalSigns** - List all vital signs scoped to a given patient
- **GetVitalSigns** - List all vital signs
- **GetPatientsOrthostaticVitalSigns** - List all Orthostatic vital signs scoped to a given patient
- **GetOrthostaticVitalSigns** - List all orthostatic vital signs
- **GetPatientsCiwaArs** - List all CiwaArs scoped to a given patient
- **GetCiwaArs** - List all CiwaArs
- **GetPatientsCiwaBs** - List all CiwaBs scoped to a given patient
- **GetCiwaBs** - List all CiwaBs
- **GetPatientsCows** - List all Cows scoped to a given patient
- **GetCows** - List all Cows
- **GetPatientsGlucoseLogs** - List all Glucose Logs scoped to a given patient
- **GetGlucoseLogs** - List all GlucoseLogs

### 📅 Appointments & Scheduling
- **GetAppointments** - List and search appointments
- **GetAppointmentsByAppointmentId** - Fetch an Appointment Record
- **GetPatientsAppointments** - List all appointments scoped to a given patient
- **GetProvidersAppointments** - List all appointments scoped to a given provider
- **GetUsersAppointments** - List all appointments scoped to a given user
- **GetSchedulerAppointments** - List all appointments
- **GetSchedulerAppointmentByAppointmentId** - Fetch an appointment
- **GetSchedulerAppointmentTypes** - List all appointment types
- **GetSchedulerAppointmentStatuses** - List all appointment statuses
- **GetSchedulerResources** - List all resources

### 🏥 Orders & Admissions
- **GetPatientsOrders** - List patient orders
- **GetPatientOrders** - List all patient orders
- **GetPatientOrderByPatientOrderId** - Fetch Details of a Patient Order
- **GetPatientsPatientOrders** - List all patient orders scoped to a patient
- **GetPatientsAdmissions** - List patient admissions history
- **GetPatientsProgramHistory** - List a patient's program history

### 📋 Evaluations & Processes
- **GetPatientsEvaluations** - List all patient evaluations
- **GetPatientsProcesses** - List all patient processes
- **GetEvaluations** - List all Evaluations
- **GetEvaluationByEvaluationId** - Fetch Details for a Evaluation
- **GetPatientEvaluations** - List all Patient Evaluations
- **GetPatientEvaluationByPatientEvaluationId** - Fetch Details for a Patient Evaluation
- **GetPatientsPatientEvaluations** - List all Patient Evaluations scoped to a patient

### 👥 Group Sessions & Therapy
- **GetGroupSessions** - List all group sessions
- **GetGroupSessionsById** - Fetches a group session
- **GetPatientsGroupSessions** - List all group sessions scoped to a given patient
- **GetPatientsGroupSessionsById** - Fetches group session of the given patient

### 💰 Insurance & Billing
- **GetPatientsInsurance** - List insurance information for a specific patient
- **GetInsurances** - List insurances with updated_at within a date range
- **GetPatientsUtilizationReviews** - List patient utilization reviews
- **GetUtilizationReviewsLatest** - List utilization reviews with updated_at within a date range
- **GetSettingsPayors** - List all payors

### 📄 Consent & Documentation
- **GetConsentForms** - List all Consent Forms
- **GetConsentFormRecords** - List all Consent Form Records
- **GetConsentFormRecordsByRecordId** - Fetch Details for a Consent Form Record
- **GetPatientsConsentFormRecords** - List all Consent Form Records for a patient

### 👤 Users & Providers
- **GetUsers** - List all Users
- **GetUsersById** - Fetch a User Record
- **GetUsersRoles** - List all roles scoped to a given user
- **GetProviders** - List all Providers
- **GetProvidersById** - Fetch a Provider Record
- **GetProvidersRoles** - List all roles scoped to a given provider
- **GetRoles** - List all Roles
- **GetRolesUsers** - List all users scoped to a given role
- **GetUserTitles** - List user titles

### 🏢 Administrative & Settings
- **GetLocations** - List all locations
- **GetCareLevels** - List all Levels of Care
- **GetContacts** - List all contacts
- **GetContactsById** - Fetches a contact
- **GetContactsReferrers** - List all referrers
- **GetContactTypes** - List all contact types
- **GetPatientSettings** - List all patient settings
- **GetPatientColors** - List all patient colors
- **GetPatientTags** - List all patient tags
- **GetPatientDiets** - List all patient diets
- **GetPatientsPatientDiets** - List patient diets scoped to a patient
- **GetFlags** - List all flags
- **GetFlagCategories** - List all flag categories

## 🛡️ Security & Authentication

The server implements Kipu's secure APIAuth authentication system using HMAC-SHA1 signatures:

- All requests are signed with your secret key
- Timestamps prevent replay attacks  
- Secure header-based authentication
- PHI (Protected Health Information) access levels supported

## 🏗️ Development

### Prerequisites

- Node.js 20.0.0 or higher
- TypeScript 5.8+
- Valid Kipu API credentials

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/Wrkdn/kipu-mcp.git
   cd kipu-mcp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

4. Run local dev:
   ```bash
   npm run dev
   ```

### Development Scripts

- `npm run dev` - Run with hot reload using tsx
- `npm run build` - Compile TypeScript to JavaScript

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📖 API Documentation

For detailed API documentation, visit the [Kipu API Documentation](https://api.kipuapi.com/api-docs/index.html).

## 🔗 Links

- **GitHub Repository**: [https://github.com/Wrkdn/kipu-mcp](https://github.com/Wrkdn/kipu-mcp)
- **NPM Package**: [https://www.npmjs.com/package/kipu-mcp](https://www.npmjs.com/package/kipu-mcp)
- **Wrkdn Platform**: [https://wrkdn.com](https://wrkdn.com)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Technical Issues**: [Create an issue](https://github.com/Wrkdn/kipu-mcp/issues)
- **API Questions**: Contact Kipu Systems

---

**Built with ❤️ by the [Wrkdn](https://wrkdn.com/) team for the healthcare community.** 
