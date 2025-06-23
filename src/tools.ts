/**
 * Interface for MCP Tool Definition
 */
export interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: any;
  method: string;
  pathTemplate: string;
  executionParameters: { name: string; in: string }[];
  requestBodyContentType?: string;
  securityRequirements: any[];
}

export const toolDefinitionMap: Map<string, McpToolDefinition> = new Map([
  [
    'GetPatientsCensus',
    {
      name: 'GetPatientsCensus',
      description: `List all patients from a census of the database`,
      inputSchema: {
        type: 'object',
        properties: {
          phi_level: {
            type: 'string',
            enum: ['high', 'medium', 'low'],
            description: 'Detail Level',
          },
          page: {
            type: 'number',
            format: 'int32',
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            description: 'Patients per page',
          },
          insurance_detail: {
            type: 'string',
            enum: ['v121'],
            description: 'Show insurance detail with phi_level: high',
          },
          demographics_detail: {
            type: 'string',
            enum: ['v121'],
            description: 'Show demographics detail with phi_level: high',
          },
          patient_status_detail: {
            type: 'string',
            enum: ['v121'],
            description: 'Show patient status detail with phi_level: high',
          },
          patient_contacts_detail: {
            type: 'boolean',
            description: 'Show patient contacts detail with phi_level: high',
          },
          start_date: {
            type: 'string',
            format: 'date',
            description: 'Start date for census period (optional)',
          },
          end_date: {
            type: 'string',
            format: 'date',
            description: 'End date for census period (optional)',
          },
          location_id: {
            type: 'number',
            format: 'int32',
            description: 'Location ID (Can be found through the Locations index route)',
          },
          exclude_preadmission: {
            type: 'boolean',
            description: 'if true returns patient records that have an MR #',
          },
          care_team_role: {
            type: 'string',
            enum: ['therapist', 'nurse', 'physician', 'case_manager'],
            description: 'Care Team Role (Required if user_id is provided)',
          },
          user_id: {
            type: 'string',
            description: 'User Id (Required if care_team_role is provided)',
          },
        },
        required: ['phi_level'],
      },
      method: 'get',
      pathTemplate: '/patients/census',
      executionParameters: [
        { name: 'phi_level', in: 'query' },
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
        { name: 'insurance_detail', in: 'query' },
        { name: 'demographics_detail', in: 'query' },
        { name: 'patient_status_detail', in: 'query' },
        { name: 'patient_contacts_detail', in: 'query' },
        { name: 'start_date', in: 'query' },
        { name: 'end_date', in: 'query' },
        { name: 'location_id', in: 'query' },
        { name: 'exclude_preadmission', in: 'query' },
        { name: 'care_team_role', in: 'query' },
        { name: 'user_id', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetPatientsLatest',
    {
      name: 'GetPatientsLatest',
      description: `List patients with updated_at within a date range`,
      inputSchema: {
        type: 'object',
        properties: {
          start_date: {
            type: 'string',
            format: 'date',
            description: 'Start Date (Example: 2018-12-01)',
          },
          end_date: {
            type: 'string',
            format: 'date',
            description: 'End Date (Example: 2018-12-03)',
          },
          page: {
            type: 'number',
            format: 'int32',
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            description: 'Patients per page',
          },
          location_id: {
            type: 'number',
            format: 'int32',
            description: 'Location ID (Can be found through the Locations index route)',
          },
        },
        required: ['start_date', 'end_date'],
      },
      method: 'get',
      pathTemplate: '/patients/latest',
      executionParameters: [
        { name: 'start_date', in: 'query' },
        { name: 'end_date', in: 'query' },
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
        { name: 'location_id', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetPatientsOccupancy',
    {
      name: 'GetPatientsOccupancy',
      description: `Occupancy`,
      inputSchema: {
        type: 'object',
        properties: {
          phi_level: {
            type: 'string',
            enum: ['high', 'medium', 'low'],
            description: 'Detail Level',
          },
        },
        required: ['phi_level'],
      },
      method: 'get',
      pathTemplate: '/patients/occupancy',
      executionParameters: [{ name: 'phi_level', in: 'query' }],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetPatientsByPatientId',
    {
      name: 'GetPatientsByPatientId',
      description: `Fetch a Patient Record`,
      inputSchema: {
        type: 'object',
        properties: {
          phi_level: {
            type: 'string',
            enum: ['high', 'medium', 'low'],
            description: 'Detail Level',
          },
          patient_id: {
            type: 'number',
            description: 'Location Patient ID',
          },
          patient_master_id: {
            type: 'string',
            format: 'uuid',
            description: 'Patient Master UUID (Important: NOT ID)',
          },
          insurance_detail: {
            type: 'string',
            enum: ['v121'],
            description: 'Show insurance detail with phi_level: high',
          },
          demographics_detail: {
            type: 'string',
            enum: ['v121'],
            description: 'Show demographics detail with phi_level: high',
          },
          patient_status_detail: {
            type: 'string',
            enum: ['v121'],
            description: 'Show patient status detail with phi_level: high',
          },
          patient_contacts_detail: {
            type: 'boolean',
            description: 'Show patient contacts detail with phi_level: high',
          },
        },
        required: ['phi_level', 'patient_id', 'patient_master_id'],
      },
      method: 'get',
      pathTemplate: '/patients/{patient_id}',
      executionParameters: [
        { name: 'phi_level', in: 'query' },
        { name: 'patient_id', in: 'path' },
        { name: 'patient_master_id', in: 'query' },
        { name: 'insurance_detail', in: 'query' },
        { name: 'demographics_detail', in: 'query' },
        { name: 'patient_status_detail', in: 'query' },
        { name: 'patient_contacts_detail', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetAllergens',
    {
      name: 'GetAllergens',
      description: `List all allergens`,
      inputSchema: {
        type: 'object',
        properties: {
          enabled: {
            type: 'boolean',
            description: 'Only List Enabled Allergens',
          },
          allergen_type: {
            type: 'string',
            description: 'Only List Allergens with given allergen_type',
          },
          starts_with: {
            type: 'string',
            description:
              'Only List Allergens with name starting with given string (minimum input length should be 3)',
          },
          page: {
            type: 'number',
            format: 'int32',
            default: 1,
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            default: 20,
            description: 'Allergens per page',
          },
        },
        required: [],
      },
      method: 'get',
      pathTemplate: '/allergens',
      executionParameters: [
        { name: 'enabled', in: 'query' },
        { name: 'allergen_type', in: 'query' },
        { name: 'starts_with', in: 'query' },
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetAllergies',
    {
      name: 'GetAllergies',
      description: `List all allergies`,
      inputSchema: {
        type: 'object',
        properties: {
          active: {
            type: 'boolean',
            description: 'Only List Active Allergies',
          },
        },
        required: [],
      },
      method: 'get',
      pathTemplate: '/allergies',
      executionParameters: [{ name: 'active', in: 'query' }],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetAppointmentsByAppointmentId',
    {
      name: 'GetAppointmentsByAppointmentId',
      description: `Fetch an Appointment Record`,
      inputSchema: {
        type: 'object',
        properties: {
          appointment_id: {
            type: 'number',
            format: 'int32',
            description: 'Appointment ID',
          },
          days: {
            type: 'number',
            format: 'int32',
            default: 30,
            description: 'Number of days to fetch recurrences for recurring appointment',
          },
        },
        required: ['appointment_id'],
      },
      method: 'get',
      pathTemplate: '/appointments/{appointment_id}',
      executionParameters: [
        { name: 'appointment_id', in: 'path' },
        { name: 'days', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetCareLevels',
    {
      name: 'GetCareLevels',
      description: `List all Levels of Care`,
      inputSchema: {
        type: 'object',
        properties: {},
        required: [],
      },
      method: 'get',
      pathTemplate: '/care_levels',
      executionParameters: [],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetLocations',
    {
      name: 'GetLocations',
      description: `List all locations`,
      inputSchema: {
        type: 'object',
        properties: {
          include_buildings: {
            type: 'boolean',
            description: 'when enabled show additional building details per location',
          },
        },
        required: [],
      },
      method: 'get',
      pathTemplate: '/locations',
      executionParameters: [{ name: 'include_buildings', in: 'query' }],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetPatientsAllergies',
    {
      name: 'GetPatientsAllergies',
      description: `List allergies scoped to a patient`,
      inputSchema: {
        type: 'object',
        properties: {
          patient_id: {
            type: 'number',
            description: 'Location Patient ID',
          },
          patient_master_id: {
            type: 'string',
            format: 'uuid',
            description: 'Patient Master UUID (Important: NOT ID)',
          },
          active: {
            type: 'boolean',
            description: 'Only List Active Allergies',
          },
        },
        required: ['patient_id', 'patient_master_id'],
      },
      method: 'get',
      pathTemplate: '/patients/{patient_id}/allergies',
      executionParameters: [
        { name: 'patient_id', in: 'path' },
        { name: 'patient_master_id', in: 'query' },
        { name: 'active', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetPatientsVitalSigns',
    {
      name: 'GetPatientsVitalSigns',
      description: `List all vital signs scoped to a given patient`,
      inputSchema: {
        type: 'object',
        properties: {
          patient_id: {
            type: 'number',
            description: 'Location Patient ID',
          },
          patient_master_id: {
            type: 'string',
            format: 'uuid',
            description: 'Patient Master UUID (Important: NOT ID)',
          },
          page: {
            type: 'number',
            format: 'int32',
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            description: 'Vital Signs per page',
          },
          created_at_start_date: {
            type: 'string',
            format: 'date',
            description: 'Start Date (Example: 2018-12-01): Starting date',
          },
          created_at_end_date: {
            type: 'string',
            format: 'date',
            description: 'End Date (Example: 2018-12-23): Ending date',
          },
          interval_start_date: {
            type: 'string',
            format: 'date',
            description: 'Interval Start Date (Example: 2018-12-01): Starting date',
          },
          interval_end_date: {
            type: 'string',
            format: 'date',
            description: 'Interval End Date (Example: 2018-12-23): Ending date',
          },
        },
        required: ['patient_id', 'patient_master_id'],
      },
      method: 'get',
      pathTemplate: '/patients/{patient_id}/vital_signs',
      executionParameters: [
        { name: 'patient_id', in: 'path' },
        { name: 'patient_master_id', in: 'query' },
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
        { name: 'created_at_start_date', in: 'query' },
        { name: 'created_at_end_date', in: 'query' },
        { name: 'interval_start_date', in: 'query' },
        { name: 'interval_end_date', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetPatientsProcesses',
    {
      name: 'GetPatientsProcesses',
      description: `List all patient processes`,
      inputSchema: {
        type: 'object',
        properties: {
          process_details: {
            type: 'boolean',
            default: false,
            description: 'Show additional process details; used to display show_forms status',
          },
        },
        required: [],
      },
      method: 'get',
      pathTemplate: '/patients/processes',
      executionParameters: [{ name: 'process_details', in: 'query' }],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetPatientsEvaluations',
    {
      name: 'GetPatientsEvaluations',
      description: `List all patient evaluations`,
      inputSchema: {
        type: 'object',
        properties: {
          page: {
            type: 'number',
            format: 'int32',
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            description: 'Patient Evaluations per page',
          },
          patient_id: {
            type: 'number',
            description: 'Location Patient ID',
          },
          patient_master_id: {
            type: 'string',
            format: 'uuid',
            description: 'Patient Master UUID (Important: NOT ID)',
          },
          current_census_only: {
            type: 'boolean',
            description: 'Includes only the Patient Evaluations with patient in current census',
          },
          created_at_start_date: {
            type: 'string',
            format: 'date',
            description: 'Start Date (Example: 2018-12-01)',
          },
          created_at_end_date: {
            type: 'string',
            format: 'date',
            description: 'End Date (Example: 2018-12-03)',
          },
          evaluation_content: {
            type: 'string',
            description: 'Evaluation content value to filter by',
          },
          patient_process_id: {
            type: 'number',
            format: 'int32',
            description: 'Patient process ID to filter by',
          },
        },
        required: [],
      },
      method: 'get',
      pathTemplate: '/patients/evaluations',
      executionParameters: [
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
        { name: 'patient_id', in: 'query' },
        { name: 'patient_master_id', in: 'query' },
        { name: 'current_census_only', in: 'query' },
        { name: 'created_at_start_date', in: 'query' },
        { name: 'created_at_end_date', in: 'query' },
        { name: 'evaluation_content', in: 'query' },
        { name: 'patient_process_id', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetUsers',
    {
      name: 'GetUsers',
      description: `List all Users`,
      inputSchema: {
        type: 'object',
        properties: {
          page: {
            type: 'number',
            format: 'int32',
            default: 1,
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            default: 20,
            description: 'Users per page',
          },
        },
        required: [],
      },
      method: 'get',
      pathTemplate: '/users',
      executionParameters: [
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetMedications',
    {
      name: 'GetMedications',
      description: `List all medications`,
      inputSchema: {
        type: 'object',
        properties: {
          enabled: {
            type: 'boolean',
            description: 'Only List Enabled Medications',
          },
          page: {
            type: 'number',
            format: 'int32',
            default: 1,
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            default: 20,
            description: 'Medications per page',
          },
          starts_with: {
            type: 'string',
            description: 'Filter medications by name starting with given string',
          },
          rxcui: {
            type: 'string',
            description: 'Filter by RXCUI code',
          },
          ndc: {
            type: 'string',
            description: 'Filter by NDC code',
          },
        },
        required: [],
      },
      method: 'get',
      pathTemplate: '/medications',
      executionParameters: [
        { name: 'enabled', in: 'query' },
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
        { name: 'starts_with', in: 'query' },
        { name: 'rxcui', in: 'query' },
        { name: 'ndc', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetDiagnoses',
    {
      name: 'GetDiagnoses',
      description: `List all diagnoses`,
      inputSchema: {
        type: 'object',
        properties: {
          enabled: {
            type: 'boolean',
            description: 'Only List Enabled Diagnoses',
          },
          page: {
            type: 'number',
            format: 'int32',
            default: 1,
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            default: 20,
            description: 'Diagnoses per page',
          },
          starts_with: {
            type: 'string',
            description: 'Filter diagnoses by name starting with given string',
          },
          icd_code: {
            type: 'string',
            description: 'Filter by ICD code',
          },
        },
        required: [],
      },
      method: 'get',
      pathTemplate: '/diagnoses',
      executionParameters: [
        { name: 'enabled', in: 'query' },
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
        { name: 'starts_with', in: 'query' },
        { name: 'icd_code', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetProviders',
    {
      name: 'GetProviders',
      description: `List all Providers`,
      inputSchema: {
        type: 'object',
        properties: {
          page: {
            type: 'number',
            format: 'int32',
            default: 1,
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            default: 20,
            description: 'Providers per page',
          },
        },
        required: [],
      },
      method: 'get',
      pathTemplate: '/providers',
      executionParameters: [
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetInsurances',
    {
      name: 'GetInsurances',
      description: `List insurances with updated_at within a date range`,
      inputSchema: {
        type: 'object',
        properties: {
          start_date: {
            type: 'string',
            format: 'date',
            description: 'Start Date (Example: 2018-12-01)',
          },
          end_date: {
            type: 'string',
            format: 'date',
            description: 'End Date (Example: 2018-12-03)',
          },
          page: {
            type: 'number',
            format: 'int32',
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            description: 'Insurances per page',
          },
        },
        required: ['start_date', 'end_date'],
      },
      method: 'get',
      pathTemplate: '/insurances/latest',
      executionParameters: [
        { name: 'start_date', in: 'query' },
        { name: 'end_date', in: 'query' },
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetPatientsMedications',
    {
      name: 'GetPatientsMedications',
      description: `List medications for a specific patient`,
      inputSchema: {
        type: 'object',
        properties: {
          patient_id: {
            type: 'number',
            description: 'Location Patient ID',
          },
          patient_master_id: {
            type: 'string',
            format: 'uuid',
            description: 'Patient Master UUID (Important: NOT ID)',
          },
          page: {
            type: 'number',
            format: 'int32',
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            description: 'Medications per page',
          },
          active: {
            type: 'boolean',
            description: 'Only list active medications',
          },
          medication_name: {
            type: 'string',
            description: 'Filter by medication name',
          },
        },
        required: ['patient_id', 'patient_master_id'],
      },
      method: 'get',
      pathTemplate: '/patients/{patient_id}/patient_medications',
      executionParameters: [
        { name: 'patient_id', in: 'path' },
        { name: 'patient_master_id', in: 'query' },
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
        { name: 'active', in: 'query' },
        { name: 'medication_name', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetPatientsDiagnoses',
    {
      name: 'GetPatientsDiagnoses',
      description: `List diagnoses for a specific patient`,
      inputSchema: {
        type: 'object',
        properties: {
          patient_id: {
            type: 'number',
            description: 'Location Patient ID',
          },
          patient_master_id: {
            type: 'string',
            format: 'uuid',
            description: 'Patient Master UUID (Important: NOT ID)',
          },
          page: {
            type: 'number',
            format: 'int32',
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            description: 'Diagnoses per page',
          },
          active: {
            type: 'boolean',
            description: 'Only list active diagnoses',
          },
          primary: {
            type: 'boolean',
            description: 'Only list primary diagnoses',
          },
        },
        required: ['patient_id', 'patient_master_id'],
      },
      method: 'get',
      pathTemplate: '/patients/{patient_id}/patient_diagnoses',
      executionParameters: [
        { name: 'patient_id', in: 'path' },
        { name: 'patient_master_id', in: 'query' },
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
        { name: 'active', in: 'query' },
        { name: 'primary', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetPatientsInsurance',
    {
      name: 'GetPatientsInsurance',
      description: `List insurance information for a specific patient`,
      inputSchema: {
        type: 'object',
        properties: {
          patient_id: {
            type: 'number',
            description: 'Location Patient ID',
          },
          patient_master_id: {
            type: 'string',
            format: 'uuid',
            description: 'Patient Master UUID (Important: NOT ID)',
          },
          active: {
            type: 'boolean',
            description: 'Only list active insurance',
          },
        },
        required: ['patient_id', 'patient_master_id'],
      },
      method: 'get',
      pathTemplate: '/patients/{patient_id}/insurances',
      executionParameters: [
        { name: 'patient_id', in: 'path' },
        { name: 'patient_master_id', in: 'query' },
        { name: 'active', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetPatientsOrders',
    {
      name: 'GetPatientsOrders',
      description: `List patient orders`,
      inputSchema: {
        type: 'object',
        properties: {
          patient_id: {
            type: 'number',
            description: 'Location Patient ID',
          },
          patient_master_id: {
            type: 'string',
            format: 'uuid',
            description: 'Patient Master UUID (Important: NOT ID)',
          },
          page: {
            type: 'number',
            format: 'int32',
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            description: 'Patient orders per page',
          },
          status: {
            type: 'string',
            enum: ['canceled', 'pending_order_review', 'pending_discontinue_review', 'reviewed'],
            description: 'Patient order status to filter',
          },
          medication_name: {
            type: 'string',
            description: 'Patient order name to filter by',
          },
          created_at_start_date: {
            type: 'string',
            format: 'date',
            description: 'Created at Start Date (Example: 2018-12-01)',
          },
          created_at_end_date: {
            type: 'string',
            format: 'date',
            description: 'Created at End Date (Example: 2018-12-03)',
          },
        },
        required: ['patient_id', 'patient_master_id'],
      },
      method: 'get',
      pathTemplate: '/patients/{patient_id}/patient_orders',
      executionParameters: [
        { name: 'patient_id', in: 'path' },
        { name: 'patient_master_id', in: 'query' },
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
        { name: 'status', in: 'query' },
        { name: 'medication_name', in: 'query' },
        { name: 'created_at_start_date', in: 'query' },
        { name: 'created_at_end_date', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetPatientsAdmissions',
    {
      name: 'GetPatientsAdmissions',
      description: `List patient admissions history`,
      inputSchema: {
        type: 'object',
        properties: {
          patient_id: {
            type: 'number',
            description: 'Location Patient ID',
          },
          patient_master_id: {
            type: 'string',
            format: 'uuid',
            description: 'Patient Master UUID (Important: NOT ID)',
          },
          page: {
            type: 'number',
            format: 'int32',
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            description: 'Admissions per page',
          },
          admission_date_start: {
            type: 'string',
            format: 'date',
            description: 'Admission start date filter',
          },
          admission_date_end: {
            type: 'string',
            format: 'date',
            description: 'Admission end date filter',
          },
        },
        required: ['patient_id', 'patient_master_id'],
      },
      method: 'get',
      pathTemplate: '/patients/{patient_id}/admissions',
      executionParameters: [
        { name: 'patient_id', in: 'path' },
        { name: 'patient_master_id', in: 'query' },
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
        { name: 'admission_date_start', in: 'query' },
        { name: 'admission_date_end', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],

  [
    'GetPatientsUtilizationReviews',
    {
      name: 'GetPatientsUtilizationReviews',
      description: `List patient utilization reviews`,
      inputSchema: {
        type: 'object',
        properties: {
          patient_id: {
            type: 'number',
            description: 'Location Patient ID',
          },
          patient_master_id: {
            type: 'string',
            format: 'uuid',
            description: 'Patient Master UUID (Important: NOT ID)',
          },
          page: {
            type: 'number',
            format: 'int32',
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            description: 'Utilization reviews per page',
          },
          phi_level: {
            type: 'string',
            enum: ['high', 'medium', 'low'],
            description: 'Detail Level (optional)',
          },
        },
        required: ['patient_id', 'patient_master_id'],
      },
      method: 'get',
      pathTemplate: '/patients/{patient_id}/utilization_reviews',
      executionParameters: [
        { name: 'patient_id', in: 'path' },
        { name: 'patient_master_id', in: 'query' },
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
        { name: 'phi_level', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],

  [
    'GetAppointments',
    {
      name: 'GetAppointments',
      description: `List and search appointments`,
      inputSchema: {
        type: 'object',
        properties: {
          page: {
            type: 'number',
            format: 'int32',
            default: 1,
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            default: 20,
            description: 'Appointments per page',
          },
          patient_id: {
            type: 'number',
            description: 'Filter by patient ID',
          },
          provider_id: {
            type: 'number',
            description: 'Filter by provider ID',
          },
          location_id: {
            type: 'number',
            format: 'int32',
            description: 'Filter by location ID',
          },
          appointment_date_start: {
            type: 'string',
            format: 'date',
            description: 'Appointment start date filter',
          },
          appointment_date_end: {
            type: 'string',
            format: 'date',
            description: 'Appointment end date filter',
          },
          status: {
            type: 'string',
            description: 'Filter by appointment status',
          },
          start_date: {
            type: 'string',
            format: 'date',
            description: 'Start Date (Example: 2018-12-01): Starting date',
          },
          end_date: {
            type: 'string',
            format: 'date',
            description: 'End Date (Example: 2018-12-01): Ending date',
          },
        },
        required: [],
      },
      method: 'get',
      pathTemplate: '/appointments',
      executionParameters: [
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
        { name: 'patient_id', in: 'query' },
        { name: 'provider_id', in: 'query' },
        { name: 'location_id', in: 'query' },
        { name: 'appointment_date_start', in: 'query' },
        { name: 'appointment_date_end', in: 'query' },
        { name: 'status', in: 'query' },
        { name: 'start_date', in: 'query' },
        { name: 'end_date', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],

  // Clinical Assessment Tools
  [
    'GetCiwaArs',
    {
      name: 'GetCiwaArs',
      description: `List all CiwaArs`,
      inputSchema: {
        type: 'object',
        properties: {
          page: {
            type: 'number',
            format: 'int32',
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            description: 'CiwaArs per page',
          },
          created_at_start_date: {
            type: 'string',
            format: 'date',
            description: 'Start Date (Example: 2018-12-01): Starting date',
          },
          created_at_end_date: {
            type: 'string',
            format: 'date',
            description: 'End Date (Example: 2018-12-23): Ending date',
          },
          interval_start_date: {
            type: 'string',
            format: 'date',
            description: 'Start Date (Example: 2018-12-01): Starting date',
          },
          interval_end_date: {
            type: 'string',
            format: 'date',
            description: 'End Date (Example: 2018-12-23): Ending date',
          },
        },
        required: [],
      },
      method: 'get',
      pathTemplate: '/ciwa_ars',
      executionParameters: [
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
        { name: 'created_at_start_date', in: 'query' },
        { name: 'created_at_end_date', in: 'query' },
        { name: 'interval_start_date', in: 'query' },
        { name: 'interval_end_date', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetCiwaBs',
    {
      name: 'GetCiwaBs',
      description: `List all CiwaBs`,
      inputSchema: {
        type: 'object',
        properties: {
          page: {
            type: 'number',
            format: 'int32',
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            description: 'CiwaBs per page',
          },
          created_at_start_date: {
            type: 'string',
            format: 'date',
            description: 'Start Date (Example: 2018-12-01): Starting date',
          },
          created_at_end_date: {
            type: 'string',
            format: 'date',
            description: 'End Date (Example: 2018-12-23): Ending date',
          },
          interval_start_date: {
            type: 'string',
            format: 'date',
            description: 'Start Date (Example: 2018-12-01): Starting date',
          },
          interval_end_date: {
            type: 'string',
            format: 'date',
            description: 'End Date (Example: 2018-12-23): Ending date',
          },
        },
        required: [],
      },
      method: 'get',
      pathTemplate: '/ciwa_bs',
      executionParameters: [
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
        { name: 'created_at_start_date', in: 'query' },
        { name: 'created_at_end_date', in: 'query' },
        { name: 'interval_start_date', in: 'query' },
        { name: 'interval_end_date', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetCows',
    {
      name: 'GetCows',
      description: `List all Cows`,
      inputSchema: {
        type: 'object',
        properties: {
          page: {
            type: 'number',
            format: 'int32',
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            description: 'Cows per page',
          },
          created_at_start_date: {
            type: 'string',
            format: 'date',
            description: 'Start Date (Example: 2018-12-01): Starting date',
          },
          created_at_end_date: {
            type: 'string',
            format: 'date',
            description: 'End Date (Example: 2018-12-23): Ending date',
          },
          interval_start_date: {
            type: 'string',
            format: 'date',
            description: 'Start Date (Example: 2018-12-01): Starting date',
          },
          interval_end_date: {
            type: 'string',
            format: 'date',
            description: 'End Date (Example: 2018-12-23): Ending date',
          },
        },
        required: [],
      },
      method: 'get',
      pathTemplate: '/cows',
      executionParameters: [
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
        { name: 'created_at_start_date', in: 'query' },
        { name: 'created_at_end_date', in: 'query' },
        { name: 'interval_start_date', in: 'query' },
        { name: 'interval_end_date', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetPatientsCiwaArs',
    {
      name: 'GetPatientsCiwaArs',
      description: `List all CiwaArs scoped to a given patient`,
      inputSchema: {
        type: 'object',
        properties: {
          patient_id: {
            type: 'number',
            description: 'Location Patient ID',
          },
          patient_master_id: {
            type: 'string',
            format: 'uuid',
            description: 'Patient Master UUID (Important: NOT ID)',
          },
          page: {
            type: 'number',
            format: 'int32',
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            description: 'CiwaArs per page',
          },
          created_at_start_date: {
            type: 'string',
            format: 'date',
            description: 'Start Date (Example: 2018-12-01): Starting date',
          },
          created_at_end_date: {
            type: 'string',
            format: 'date',
            description: 'End Date (Example: 2018-12-23): Ending date',
          },
          interval_start_date: {
            type: 'string',
            format: 'date',
            description: 'Start Date (Example: 2018-12-01): Starting date',
          },
          interval_end_date: {
            type: 'string',
            format: 'date',
            description: 'End Date (Example: 2018-12-23): Ending date',
          },
        },
        required: ['patient_id', 'patient_master_id'],
      },
      method: 'get',
      pathTemplate: '/patients/{patient_id}/ciwa_ars',
      executionParameters: [
        { name: 'patient_id', in: 'path' },
        { name: 'patient_master_id', in: 'query' },
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
        { name: 'created_at_start_date', in: 'query' },
        { name: 'created_at_end_date', in: 'query' },
        { name: 'interval_start_date', in: 'query' },
        { name: 'interval_end_date', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetPatientsCiwaBs',
    {
      name: 'GetPatientsCiwaBs',
      description: `List all CiwaBs scoped to a given patient`,
      inputSchema: {
        type: 'object',
        properties: {
          patient_id: {
            type: 'number',
            description: 'Location Patient ID',
          },
          patient_master_id: {
            type: 'string',
            format: 'uuid',
            description: 'Patient Master UUID (Important: NOT ID)',
          },
          page: {
            type: 'number',
            format: 'int32',
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            description: 'CiwaBs per page',
          },
          created_at_start_date: {
            type: 'string',
            format: 'date',
            description: 'Start Date (Example: 2018-12-01): Starting date',
          },
          created_at_end_date: {
            type: 'string',
            format: 'date',
            description: 'End Date (Example: 2018-12-23): Ending date',
          },
          interval_start_date: {
            type: 'string',
            format: 'date',
            description: 'Start Date (Example: 2018-12-01): Starting date',
          },
          interval_end_date: {
            type: 'string',
            format: 'date',
            description: 'End Date (Example: 2018-12-23): Ending date',
          },
        },
        required: ['patient_id', 'patient_master_id'],
      },
      method: 'get',
      pathTemplate: '/patients/{patient_id}/ciwa_bs',
      executionParameters: [
        { name: 'patient_id', in: 'path' },
        { name: 'patient_master_id', in: 'query' },
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
        { name: 'created_at_start_date', in: 'query' },
        { name: 'created_at_end_date', in: 'query' },
        { name: 'interval_start_date', in: 'query' },
        { name: 'interval_end_date', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetPatientsCows',
    {
      name: 'GetPatientsCows',
      description: `List all Cows scoped to a given patient`,
      inputSchema: {
        type: 'object',
        properties: {
          patient_id: {
            type: 'number',
            description: 'Location Patient ID',
          },
          patient_master_id: {
            type: 'string',
            format: 'uuid',
            description: 'Patient Master UUID (Important: NOT ID)',
          },
          page: {
            type: 'number',
            format: 'int32',
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            description: 'Cows per page',
          },
          created_at_start_date: {
            type: 'string',
            format: 'date',
            description: 'Start Date (Example: 2018-12-01): Starting date',
          },
          created_at_end_date: {
            type: 'string',
            format: 'date',
            description: 'End Date (Example: 2018-12-23): Ending date',
          },
          interval_start_date: {
            type: 'string',
            format: 'date',
            description: 'Start Date (Example: 2018-12-01): Starting date',
          },
          interval_end_date: {
            type: 'string',
            format: 'date',
            description: 'End Date (Example: 2018-12-23): Ending date',
          },
        },
        required: ['patient_id', 'patient_master_id'],
      },
      method: 'get',
      pathTemplate: '/patients/{patient_id}/cows',
      executionParameters: [
        { name: 'patient_id', in: 'path' },
        { name: 'patient_master_id', in: 'query' },
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
        { name: 'created_at_start_date', in: 'query' },
        { name: 'created_at_end_date', in: 'query' },
        { name: 'interval_start_date', in: 'query' },
        { name: 'interval_end_date', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetGlucoseLogs',
    {
      name: 'GetGlucoseLogs',
      description: `List all GlucoseLogs`,
      inputSchema: {
        type: 'object',
        properties: {
          page: {
            type: 'number',
            format: 'int32',
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            description: 'Glucose Logs per page',
          },
          created_at_start_date: {
            type: 'string',
            format: 'date',
            description: 'Start Date (Example: 2018-12-01): Starting date',
          },
          created_at_end_date: {
            type: 'string',
            format: 'date',
            description: 'End Date (Example: 2018-12-23): Ending date',
          },
          evaluation_start_date: {
            type: 'string',
            format: 'date',
            description: 'Start Date (Example: 2018-12-01): Starting date',
          },
          evaluation_end_date: {
            type: 'string',
            format: 'date',
            description: 'End Date (Example: 2018-12-23): Ending date',
          },
        },
        required: [],
      },
      method: 'get',
      pathTemplate: '/glucose_logs',
      executionParameters: [
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
        { name: 'created_at_start_date', in: 'query' },
        { name: 'created_at_end_date', in: 'query' },
        { name: 'evaluation_start_date', in: 'query' },
        { name: 'evaluation_end_date', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetPatientsGlucoseLogs',
    {
      name: 'GetPatientsGlucoseLogs',
      description: `List all Glucose Logs scoped to a given patient`,
      inputSchema: {
        type: 'object',
        properties: {
          patient_id: {
            type: 'number',
            description: 'Location Patient ID',
          },
          patient_master_id: {
            type: 'string',
            format: 'uuid',
            description: 'Patient Master UUID (Important: NOT ID)',
          },
          page: {
            type: 'number',
            format: 'int32',
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            description: 'Glucose Logs per page',
          },
          created_at_start_date: {
            type: 'string',
            format: 'date',
            description: 'Start Date (Example: 2018-12-01): Starting date',
          },
          created_at_end_date: {
            type: 'string',
            format: 'date',
            description: 'End Date (Example: 2018-12-23): Ending date',
          },
          evaluation_start_date: {
            type: 'string',
            format: 'date',
            description: 'Start Date (Example: 2018-12-01): Starting date',
          },
          evaluation_end_date: {
            type: 'string',
            format: 'date',
            description: 'End Date (Example: 2018-12-23): Ending date',
          },
        },
        required: ['patient_id', 'patient_master_id'],
      },
      method: 'get',
      pathTemplate: '/patients/{patient_id}/glucose_logs',
      executionParameters: [
        { name: 'patient_id', in: 'path' },
        { name: 'patient_master_id', in: 'query' },
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
        { name: 'created_at_start_date', in: 'query' },
        { name: 'created_at_end_date', in: 'query' },
        { name: 'evaluation_start_date', in: 'query' },
        { name: 'evaluation_end_date', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetVitalSigns',
    {
      name: 'GetVitalSigns',
      description: `List all vital signs`,
      inputSchema: {
        type: 'object',
        properties: {
          page: {
            type: 'number',
            format: 'int32',
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            description: 'Vital signs per page',
          },
          created_at_start_date: {
            type: 'string',
            format: 'date',
            description: 'Start Date (Example: 2018-12-01): Starting date',
          },
          created_at_end_date: {
            type: 'string',
            format: 'date',
            description: 'End Date (Example: 2018-12-23): Ending date',
          },
          interval_start_date: {
            type: 'string',
            format: 'date',
            description: 'Start Date (Example: 2018-12-01): Starting date',
          },
          interval_end_date: {
            type: 'string',
            format: 'date',
            description: 'End Date (Example: 2018-12-23): Ending date',
          },
        },
        required: [],
      },
      method: 'get',
      pathTemplate: '/vital_signs',
      executionParameters: [
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
        { name: 'created_at_start_date', in: 'query' },
        { name: 'created_at_end_date', in: 'query' },
        { name: 'interval_start_date', in: 'query' },
        { name: 'interval_end_date', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetOrthostaticVitalSigns',
    {
      name: 'GetOrthostaticVitalSigns',
      description: `List all orthostatic vital signs`,
      inputSchema: {
        type: 'object',
        properties: {
          page: {
            type: 'number',
            format: 'int32',
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            description: 'Orthostatic vital signs per page',
          },
          created_at_start_date: {
            type: 'string',
            format: 'date',
            description: 'Start Date (Example: 2018-12-01): Starting date',
          },
          created_at_end_date: {
            type: 'string',
            format: 'date',
            description: 'End Date (Example: 2018-12-23): Ending date',
          },
          interval_start_date: {
            type: 'string',
            format: 'date',
            description: 'Start Date (Example: 2018-12-01): Starting date',
          },
          interval_end_date: {
            type: 'string',
            format: 'date',
            description: 'End Date (Example: 2018-12-23): Ending date',
          },
        },
        required: [],
      },
      method: 'get',
      pathTemplate: '/orthostatic_vital_signs',
      executionParameters: [
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
        { name: 'created_at_start_date', in: 'query' },
        { name: 'created_at_end_date', in: 'query' },
        { name: 'interval_start_date', in: 'query' },
        { name: 'interval_end_date', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetPatientsOrthostaticVitalSigns',
    {
      name: 'GetPatientsOrthostaticVitalSigns',
      description: `List all Orthostatic vital signs scoped to a given patient`,
      inputSchema: {
        type: 'object',
        properties: {
          patient_id: {
            type: 'number',
            description: 'Location Patient ID',
          },
          patient_master_id: {
            type: 'string',
            format: 'uuid',
            description: 'Patient Master UUID (Important: NOT ID)',
          },
          page: {
            type: 'number',
            format: 'int32',
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            description: 'Orthostatic vital signs per page',
          },
          created_at_start_date: {
            type: 'string',
            format: 'date',
            description: 'Start Date (Example: 2018-12-01): Starting date',
          },
          created_at_end_date: {
            type: 'string',
            format: 'date',
            description: 'End Date (Example: 2018-12-23): Ending date',
          },
          interval_start_date: {
            type: 'string',
            format: 'date',
            description: 'Start Date (Example: 2018-12-01): Starting date',
          },
          interval_end_date: {
            type: 'string',
            format: 'date',
            description: 'End Date (Example: 2018-12-23): Ending date',
          },
        },
        required: ['patient_id', 'patient_master_id'],
      },
      method: 'get',
      pathTemplate: '/patients/{patient_id}/orthostatic_vital_signs',
      executionParameters: [
        { name: 'patient_id', in: 'path' },
        { name: 'patient_master_id', in: 'query' },
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
        { name: 'created_at_start_date', in: 'query' },
        { name: 'created_at_end_date', in: 'query' },
        { name: 'interval_start_date', in: 'query' },
        { name: 'interval_end_date', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],

  // Consent Forms & Records
  [
    'GetConsentForms',
    {
      name: 'GetConsentForms',
      description: `List all Consent Forms`,
      inputSchema: {
        type: 'object',
        properties: {},
        required: [],
      },
      method: 'get',
      pathTemplate: '/consent_forms',
      executionParameters: [],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetConsentFormRecords',
    {
      name: 'GetConsentFormRecords',
      description: `List all Consent Form Records`,
      inputSchema: {
        type: 'object',
        properties: {
          consent_form_id: {
            type: 'string',
            format: 'date',
            description: 'Filter by a Consent Form',
          },
          include_stranded: {
            type: 'boolean',
            description: 'Include Records without a Patient',
          },
          page: {
            type: 'number',
            format: 'int32',
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            description: 'Patients per page',
          },
        },
        required: [],
      },
      method: 'get',
      pathTemplate: '/consent_form_records',
      executionParameters: [
        { name: 'consent_form_id', in: 'query' },
        { name: 'include_stranded', in: 'query' },
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetConsentFormRecordsByRecordId',
    {
      name: 'GetConsentFormRecordsByRecordId',
      description: `Fetch Details for a Consent Form Record`,
      inputSchema: {
        type: 'object',
        properties: {
          record_id: {
            type: 'number',
            description: 'Consent Form Record ID',
          },
        },
        required: ['record_id'],
      },
      method: 'get',
      pathTemplate: '/consent_form_records/{record_id}',
      executionParameters: [{ name: 'record_id', in: 'path' }],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetPatientsConsentFormRecords',
    {
      name: 'GetPatientsConsentFormRecords',
      description: `List all Consent Form Records for a patient`,
      inputSchema: {
        type: 'object',
        properties: {
          patient_id: {
            type: 'number',
            description: 'Location Patient ID',
          },
          patient_master_id: {
            type: 'string',
            format: 'uuid',
            description: 'Patient Master UUID (Important: NOT ID)',
          },
          consent_form_id: {
            type: 'number',
            description: 'Filter by a Consent Form',
          },
          page: {
            type: 'number',
            format: 'int32',
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            description: 'Patients per page',
          },
        },
        required: ['patient_id', 'patient_master_id'],
      },
      method: 'get',
      pathTemplate: '/patients/{patient_id}/consent_form_records',
      executionParameters: [
        { name: 'patient_id', in: 'path' },
        { name: 'patient_master_id', in: 'query' },
        { name: 'consent_form_id', in: 'query' },
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],

  // Contacts & Referrers
  [
    'GetContacts',
    {
      name: 'GetContacts',
      description: `List all contacts`,
      inputSchema: {
        type: 'object',
        properties: {
          page: {
            type: 'number',
            format: 'int32',
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            description: 'Contacts per page',
          },
          contact_type_id: {
            type: 'string',
            description: 'Contact type ID to filter by',
          },
          address_state: {
            type: 'string',
            description: 'State to filter by',
          },
          address_city: {
            type: 'string',
            description: 'City to filter by',
          },
          address_zip: {
            type: 'string',
            description: 'ZIP code to filter by',
          },
          contains: {
            type: 'string',
            description: 'Company name (contains) to filter by',
          },
          begins_with: {
            type: 'string',
            description: 'Company name (begins with) to filter by',
          },
          include_contact_people: {
            type: 'boolean',
            description: 'Flag to include/exclude contact_people',
          },
          contact_person_first_name: {
            type: 'string',
            description: 'Contacts having contact_people with Individual first name to filter by',
          },
          contact_person_last_name: {
            type: 'string',
            description: 'Contacts having contact_people with Individual last name to filter by',
          },
          company_ext_id: {
            type: 'string',
            description: 'Company external ID to filter by',
          },
          kipu_crm_rs_id: {
            type: 'string',
            description: 'Kipu CRM Referral Source ID to filter by',
          },
        },
        required: [],
      },
      method: 'get',
      pathTemplate: '/contacts',
      executionParameters: [
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
        { name: 'contact_type_id', in: 'query' },
        { name: 'address_state', in: 'query' },
        { name: 'address_city', in: 'query' },
        { name: 'address_zip', in: 'query' },
        { name: 'contains', in: 'query' },
        { name: 'begins_with', in: 'query' },
        { name: 'include_contact_people', in: 'query' },
        { name: 'contact_person_first_name', in: 'query' },
        { name: 'contact_person_last_name', in: 'query' },
        { name: 'company_ext_id', in: 'query' },
        { name: 'kipu_crm_rs_id', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetContactsById',
    {
      name: 'GetContactsById',
      description: `Fetches a contact`,
      inputSchema: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Contact ID',
          },
        },
        required: ['id'],
      },
      method: 'get',
      pathTemplate: '/contacts/{id}',
      executionParameters: [{ name: 'id', in: 'path' }],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetContactsReferrers',
    {
      name: 'GetContactsReferrers',
      description: `List all referrers`,
      inputSchema: {
        type: 'object',
        properties: {},
        required: [],
      },
      method: 'get',
      pathTemplate: '/contacts/referrers',
      executionParameters: [],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetContactTypes',
    {
      name: 'GetContactTypes',
      description: `List all contact types`,
      inputSchema: {
        type: 'object',
        properties: {
          page: {
            type: 'number',
            format: 'int32',
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            description: 'Contact Types per page',
          },
        },
        required: [],
      },
      method: 'get',
      pathTemplate: '/contact_types',
      executionParameters: [
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],

  // Evaluations
  [
    'GetEvaluations',
    {
      name: 'GetEvaluations',
      description: `List all Evaluations`,
      inputSchema: {
        type: 'object',
        properties: {},
        required: [],
      },
      method: 'get',
      pathTemplate: '/evaluations',
      executionParameters: [],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetEvaluationByEvaluationId',
    {
      name: 'GetEvaluationByEvaluationId',
      description: `Fetch Details for a Evaluation`,
      inputSchema: {
        type: 'object',
        properties: {
          evaluation_id: {
            type: 'number',
            format: 'int32',
            description: 'Evaluation ID',
          },
        },
        required: ['evaluation_id'],
      },
      method: 'get',
      pathTemplate: '/evaluations/{evaluation_id}',
      executionParameters: [{ name: 'evaluation_id', in: 'path' }],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetPatientEvaluations',
    {
      name: 'GetPatientEvaluations',
      description: `List all Patient Evaluations`,
      inputSchema: {
        type: 'object',
        properties: {
          evaluation_id: {
            type: 'number',
            format: 'int32',
            description: 'Lists patient evaluations scoped to the given template id',
          },
          completed_only: {
            type: 'boolean',
            description: 'Includes only the Patient Evaluations with status completed',
          },
          current_census_only: {
            type: 'boolean',
            description: 'Includes only the Patient Evaluations with patient in current census',
          },
          start_date: {
            type: 'string',
            format: 'date',
            description: 'Start Date (Example: 2018-12-01) of the latest updated range',
          },
          end_date: {
            type: 'string',
            format: 'date',
            description: 'End Date (Example: 2018-12-03) of the latest updated range',
          },
          include_stranded: {
            type: 'boolean',
            description: 'Include Patient Evaluations not having Patient Id',
          },
          page: {
            type: 'number',
            format: 'int32',
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            description: 'Patients per page',
          },
          patient_process_id: {
            type: 'number',
            format: 'int32',
            description: 'Includes only the Patient Evaluations with given patient process id',
          },
          evaluation_content: {
            type: 'string',
            enum: ['standard', 'notes', 'treatment_plan'],
            description:
              'Includes only the Patient Evaluations with given evaluation_content value',
          },
        },
        required: [],
      },
      method: 'get',
      pathTemplate: '/patient_evaluations',
      executionParameters: [
        { name: 'evaluation_id', in: 'query' },
        { name: 'completed_only', in: 'query' },
        { name: 'current_census_only', in: 'query' },
        { name: 'start_date', in: 'query' },
        { name: 'end_date', in: 'query' },
        { name: 'include_stranded', in: 'query' },
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
        { name: 'patient_process_id', in: 'query' },
        { name: 'evaluation_content', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetPatientEvaluationByPatientEvaluationId',
    {
      name: 'GetPatientEvaluationByPatientEvaluationId',
      description: `Fetch Details for a Patient Evaluation`,
      inputSchema: {
        type: 'object',
        properties: {
          patient_evaluation_id: {
            type: 'number',
            format: 'int32',
            description: 'Patient Evaluation ID',
          },
          include_settings: {
            type: 'boolean',
            description: 'Include More Details Of Patient Evaluation',
          },
        },
        required: ['patient_evaluation_id'],
      },
      method: 'get',
      pathTemplate: '/patient_evaluations/{patient_evaluation_id}',
      executionParameters: [
        { name: 'patient_evaluation_id', in: 'path' },
        { name: 'include_settings', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetPatientsPatientEvaluations',
    {
      name: 'GetPatientsPatientEvaluations',
      description: `List all Patient Evaluations scoped to a patient`,
      inputSchema: {
        type: 'object',
        properties: {
          patient_id: {
            type: 'number',
            format: 'int32',
            description: 'Location Patient ID',
          },
          patient_master_id: {
            type: 'string',
            format: 'uuid',
            description: 'Patient Master UUID (Important: NOT ID)',
          },
          evaluation_id: {
            type: 'number',
            format: 'int32',
            description: 'Lists patient evaluations scoped to the given template id',
          },
          completed_only: {
            type: 'boolean',
            description: 'Includes only the Patient Evaluations with status completed',
          },
          current_census_only: {
            type: 'boolean',
            description: 'Includes only the Patient Evaluations with patient in current census',
          },
          start_date: {
            type: 'string',
            format: 'date',
            description: 'Start Date (Example: 2018-12-01) of the latest updated range',
          },
          end_date: {
            type: 'string',
            format: 'date',
            description: 'End Date (Example: 2018-12-03) of the latest updated range',
          },
          page: {
            type: 'number',
            format: 'int32',
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            description: 'Patients per page',
          },
          patient_process_id: {
            type: 'number',
            format: 'int32',
            description: 'Includes only the Patient Evaluations with given patient process id',
          },
          evaluation_content: {
            type: 'string',
            enum: ['standard', 'notes', 'treatment_plan'],
            description:
              'Includes only the Patient Evaluations with given evaluation_content value',
          },
        },
        required: ['patient_id', 'patient_master_id'],
      },
      method: 'get',
      pathTemplate: '/patients/{patient_id}/patient_evaluations',
      executionParameters: [
        { name: 'patient_id', in: 'path' },
        { name: 'patient_master_id', in: 'query' },
        { name: 'evaluation_id', in: 'query' },
        { name: 'completed_only', in: 'query' },
        { name: 'current_census_only', in: 'query' },
        { name: 'start_date', in: 'query' },
        { name: 'end_date', in: 'query' },
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
        { name: 'patient_process_id', in: 'query' },
        { name: 'evaluation_content', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],

  // Appointments & Scheduling
  [
    'GetSchedulerAppointments',
    {
      name: 'GetSchedulerAppointments',
      description: `List all appointments`,
      inputSchema: {
        type: 'object',
        properties: {
          page: {
            type: 'number',
            format: 'int32',
            default: 1,
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            default: 20,
            description: 'Resources per page',
          },
          start_date: {
            type: 'string',
            format: 'date',
            description: 'Start Date (Example: 2018-12-01)',
          },
          end_date: {
            type: 'string',
            format: 'date',
            description: 'End Date (Example: 2018-12-03)',
          },
          patient_id: {
            type: 'number',
            format: 'int32',
            description: 'fetches the appointments for the provided patient_id',
          },
          resource_id: {
            type: 'string',
            description: 'fetches the appointments for the provided resource_id',
          },
          telehealth_session_only: {
            type: 'boolean',
            description: 'fetches the appointments with telehealth_session as true',
          },
          include_group_sessions: {
            type: 'boolean',
            description: 'extends the result set to have group session appointments as well',
          },
          include_resources: {
            type: 'boolean',
            description: 'includes an extra key resources in each appointment block',
          },
          location_ids: {
            type: 'array',
            items: { type: 'integer' },
            description: 'fetches the appointments belonging to the provided locations',
          },
          patient_appointment_status_ids: {
            type: 'array',
            items: { type: 'integer' },
            description: 'fetches the appointments with the provided patient_appointment_status',
          },
          appointment_type_ids: {
            type: 'array',
            items: { type: 'integer' },
            description:
              'fetches the appointments with the given appointment type. Is ignored in case of group session appointments',
          },
        },
        required: ['start_date'],
      },
      method: 'get',
      pathTemplate: '/scheduler/appointments',
      executionParameters: [
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
        { name: 'start_date', in: 'query' },
        { name: 'end_date', in: 'query' },
        { name: 'patient_id', in: 'query' },
        { name: 'resource_id', in: 'query' },
        { name: 'telehealth_session_only', in: 'query' },
        { name: 'include_group_sessions', in: 'query' },
        { name: 'include_resources', in: 'query' },
        { name: 'location_ids', in: 'query' },
        { name: 'patient_appointment_status_ids', in: 'query' },
        { name: 'appointment_type_ids', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetSchedulerAppointmentByAppointmentId',
    {
      name: 'GetSchedulerAppointmentByAppointmentId',
      description: `Fetch an appointment`,
      inputSchema: {
        type: 'object',
        properties: {
          appointment_id: {
            type: 'number',
            format: 'int32',
            description: 'Appointment ID',
          },
        },
        required: ['appointment_id'],
      },
      method: 'get',
      pathTemplate: '/scheduler/appointments/{appointment_id}',
      executionParameters: [{ name: 'appointment_id', in: 'path' }],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetSchedulerAppointmentTypes',
    {
      name: 'GetSchedulerAppointmentTypes',
      description: `List all appointment types`,
      inputSchema: {
        type: 'object',
        properties: {
          page: {
            type: 'number',
            format: 'int32',
            default: 1,
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            default: 20,
            description: 'Resources per page',
          },
          name: {
            type: 'string',
            description: 'name to filter the appointment types by',
          },
          enabled: {
            type: 'boolean',
            description: 'filters the appointment types on is_enabled key',
          },
        },
        required: [],
      },
      method: 'get',
      pathTemplate: '/scheduler/appointment_types',
      executionParameters: [
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
        { name: 'name', in: 'query' },
        { name: 'enabled', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetSchedulerAppointmentStatuses',
    {
      name: 'GetSchedulerAppointmentStatuses',
      description: `List all appointment statuses`,
      inputSchema: {
        type: 'object',
        properties: {
          page: {
            type: 'number',
            format: 'int32',
            default: 1,
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            default: 20,
            description: 'Resources per page',
          },
          name: {
            type: 'string',
            description: 'name to filter the appointment statuses by',
          },
        },
        required: [],
      },
      method: 'get',
      pathTemplate: '/scheduler/appointment_statuses',
      executionParameters: [
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
        { name: 'name', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetSchedulerResources',
    {
      name: 'GetSchedulerResources',
      description: `List all resources`,
      inputSchema: {
        type: 'object',
        properties: {
          page: {
            type: 'number',
            format: 'int32',
            default: 1,
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            default: 20,
            description: 'Resources per page',
          },
          name: {
            type: 'string',
            description: 'name to filter the resources by',
          },
          enabled: {
            type: 'boolean',
            description: 'enabled key to filter the resources by',
          },
          category_type: {
            type: 'string',
            description: 'category_type to filter the resources by',
          },
        },
        required: [],
      },
      method: 'get',
      pathTemplate: '/scheduler/resources',
      executionParameters: [
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
        { name: 'name', in: 'query' },
        { name: 'enabled', in: 'query' },
        { name: 'category_type', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetPatientsAppointments',
    {
      name: 'GetPatientsAppointments',
      description: `List all appointments scoped to a given patient`,
      inputSchema: {
        type: 'object',
        properties: {
          patient_id: {
            type: 'number',
            format: 'int32',
            description: 'Location Patient ID',
          },
          patient_master_id: {
            type: 'string',
            format: 'uuid',
            description: 'Patient Master UUID (Important: NOT ID)',
          },
          days: {
            type: 'number',
            format: 'int32',
            default: 30,
            description: 'Number of days to fetch upcoming dates for recurring appointments',
          },
          page: {
            type: 'number',
            format: 'int32',
            default: 1,
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            default: 20,
            description: 'Appointments per page',
          },
        },
        required: ['patient_id', 'patient_master_id'],
      },
      method: 'get',
      pathTemplate: '/patients/{patient_id}/appointments',
      executionParameters: [
        { name: 'patient_id', in: 'path' },
        { name: 'patient_master_id', in: 'query' },
        { name: 'days', in: 'query' },
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetProvidersAppointments',
    {
      name: 'GetProvidersAppointments',
      description: `List all appointments scoped to a given provider`,
      inputSchema: {
        type: 'object',
        properties: {
          provider_id: {
            type: 'string',
            format: 'uuid',
            description: 'Provider ID',
          },
          days: {
            type: 'number',
            format: 'int32',
            default: 30,
            description: 'Number of days to fetch upcoming dates for recurring appointments',
          },
          page: {
            type: 'number',
            format: 'int32',
            default: 1,
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            default: 20,
            description: 'Appointments per page',
          },
        },
        required: ['provider_id'],
      },
      method: 'get',
      pathTemplate: '/providers/{provider_id}/appointments',
      executionParameters: [
        { name: 'provider_id', in: 'path' },
        { name: 'days', in: 'query' },
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetUsersAppointments',
    {
      name: 'GetUsersAppointments',
      description: `List all appointments scoped to a given user`,
      inputSchema: {
        type: 'object',
        properties: {
          user_id: {
            type: 'string',
            format: 'uuid',
            description: 'User ID (Can be found through the Users index route)',
          },
          days: {
            type: 'number',
            format: 'int32',
            default: 30,
            description: 'Number of days to fetch upcoming dates for recurring appointments',
          },
          page: {
            type: 'number',
            format: 'int32',
            default: 1,
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            default: 20,
            description: 'Appointments per page',
          },
        },
        required: ['user_id'],
      },
      method: 'get',
      pathTemplate: '/users/{user_id}/appointments',
      executionParameters: [
        { name: 'user_id', in: 'path' },
        { name: 'days', in: 'query' },
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],

  // Group Sessions
  [
    'GetGroupSessions',
    {
      name: 'GetGroupSessions',
      description: `List all group sessions`,
      inputSchema: {
        type: 'object',
        properties: {
          page: {
            type: 'number',
            format: 'int32',
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            description: 'Group sessions per page',
          },
          location_id: {
            type: 'number',
            format: 'int32',
            description: 'Location id to filter by',
          },
          group_leader_id: {
            type: 'number',
            format: 'int32',
            description: 'Group leader id to filter by',
          },
          group_session_topic: {
            type: 'string',
            description: 'Group session Topic (contains) to filter by',
          },
          billable: {
            type: 'boolean',
            description: 'Billable value to filter by',
          },
          session_type_id: {
            type: 'string',
            description: 'Session Type ID to filter by',
          },
          session_start_date: {
            type: 'string',
            format: 'date',
            description: 'Session Start Date (Example: 2018-12-01): Starting date',
          },
          session_end_date: {
            type: 'string',
            format: 'date',
            description: 'Session End Date (Example: 2018-12-23): Ending date',
          },
        },
        required: [],
      },
      method: 'get',
      pathTemplate: '/group_sessions',
      executionParameters: [
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
        { name: 'location_id', in: 'query' },
        { name: 'group_leader_id', in: 'query' },
        { name: 'group_session_topic', in: 'query' },
        { name: 'billable', in: 'query' },
        { name: 'session_type_id', in: 'query' },
        { name: 'session_start_date', in: 'query' },
        { name: 'session_end_date', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetGroupSessionsById',
    {
      name: 'GetGroupSessionsById',
      description: `Fetches a group session`,
      inputSchema: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            format: 'int32',
            description: 'Group Session ID',
          },
        },
        required: ['id'],
      },
      method: 'get',
      pathTemplate: '/group_sessions/{id}',
      executionParameters: [{ name: 'id', in: 'path' }],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetPatientsGroupSessions',
    {
      name: 'GetPatientsGroupSessions',
      description: `List all group sessions scoped to a given patient`,
      inputSchema: {
        type: 'object',
        properties: {
          patient_id: {
            type: 'number',
            format: 'int32',
            description: 'Location Patient ID',
          },
          patient_master_id: {
            type: 'string',
            format: 'uuid',
            description: 'Patient Master UUID (Important: NOT ID)',
          },
          page: {
            type: 'number',
            format: 'int32',
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            description: 'Group sessions per page',
          },
          location_id: {
            type: 'number',
            format: 'int32',
            description: 'Location id to filter by',
          },
          group_leader_id: {
            type: 'number',
            format: 'int32',
            description: 'Group leader id to filter by',
          },
          group_session_topic: {
            type: 'string',
            description: 'Group session Topic (contains) to filter by',
          },
          billable: {
            type: 'boolean',
            description: 'Billable value to filter by',
          },
          session_type_id: {
            type: 'string',
            description: 'Session Type ID to filter by',
          },
          session_start_date: {
            type: 'string',
            format: 'date',
            description: 'Session Start Date (Example: 2018-12-01): Starting date',
          },
          session_end_date: {
            type: 'string',
            format: 'date',
            description: 'Session End Date (Example: 2018-12-23): Ending date',
          },
        },
        required: ['patient_id', 'patient_master_id'],
      },
      method: 'get',
      pathTemplate: '/patients/{patient_id}/group_sessions',
      executionParameters: [
        { name: 'patient_id', in: 'path' },
        { name: 'patient_master_id', in: 'query' },
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
        { name: 'location_id', in: 'query' },
        { name: 'group_leader_id', in: 'query' },
        { name: 'group_session_topic', in: 'query' },
        { name: 'billable', in: 'query' },
        { name: 'session_type_id', in: 'query' },
        { name: 'session_start_date', in: 'query' },
        { name: 'session_end_date', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetPatientsGroupSessionsById',
    {
      name: 'GetPatientsGroupSessionsById',
      description: `Fetches group session of the given patient`,
      inputSchema: {
        type: 'object',
        properties: {
          patient_id: {
            type: 'number',
            format: 'int32',
            description: 'Location Patient ID',
          },
          patient_master_id: {
            type: 'string',
            format: 'uuid',
            description: 'Patient Master UUID (Important: NOT ID)',
          },
          id: {
            type: 'number',
            format: 'int32',
            description: 'Group Session ID',
          },
        },
        required: ['patient_id', 'patient_master_id', 'id'],
      },
      method: 'get',
      pathTemplate: '/patients/{patient_id}/group_sessions/{id}',
      executionParameters: [
        { name: 'patient_id', in: 'path' },
        { name: 'patient_master_id', in: 'query' },
        { name: 'id', in: 'path' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],

  // Patient Orders & Management
  [
    'GetPatientOrders',
    {
      name: 'GetPatientOrders',
      description: `List all patient orders`,
      inputSchema: {
        type: 'object',
        properties: {
          page: {
            type: 'number',
            format: 'int32',
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            description: 'Patient orders per page',
          },
          status: {
            type: 'string',
            enum: ['canceled', 'pending_order_review', 'pending_discontinue_review', 'reviewed'],
            description: 'Patient order status to filter',
          },
          medication_name: {
            type: 'string',
            description: 'Patient order name to filter by',
          },
          created_at_start_date: {
            type: 'string',
            format: 'date',
            description: 'Created at Start Date (Example: 2018-12-01)',
          },
          created_at_end_date: {
            type: 'string',
            format: 'date',
            description: 'Created at End Date (Example: 2018-12-03)',
          },
          updated_at_start_date: {
            type: 'string',
            format: 'date',
            description: 'Updated at Start Date (Example: 2018-12-01)',
          },
          updated_at_end_date: {
            type: 'string',
            format: 'date',
            description: 'Updated at End Date (Example: 2018-12-03)',
          },
          rxcui: {
            type: 'string',
            description: 'RXCUI to filter by',
          },
          ndc: {
            type: 'string',
            description: 'NDC to filter by',
          },
        },
        required: [
          'created_at_start_date',
          'created_at_end_date',
          'updated_at_start_date',
          'updated_at_end_date',
        ],
      },
      method: 'get',
      pathTemplate: '/patient_orders',
      executionParameters: [
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
        { name: 'status', in: 'query' },
        { name: 'medication_name', in: 'query' },
        { name: 'created_at_start_date', in: 'query' },
        { name: 'created_at_end_date', in: 'query' },
        { name: 'updated_at_start_date', in: 'query' },
        { name: 'updated_at_end_date', in: 'query' },
        { name: 'rxcui', in: 'query' },
        { name: 'ndc', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetPatientOrderByPatientOrderId',
    {
      name: 'GetPatientOrderByPatientOrderId',
      description: `Fetch Details of a Patient Order`,
      inputSchema: {
        type: 'object',
        properties: {
          patient_order_id: {
            type: 'number',
            format: 'int32',
            description: 'Patient Order ID',
          },
        },
        required: ['patient_order_id'],
      },
      method: 'get',
      pathTemplate: '/patient_orders/{patient_order_id}',
      executionParameters: [{ name: 'patient_order_id', in: 'path' }],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetPatientsPatientOrders',
    {
      name: 'GetPatientsPatientOrders',
      description: `List all patient orders scoped to a patient`,
      inputSchema: {
        type: 'object',
        properties: {
          page: {
            type: 'number',
            format: 'int32',
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            description: 'Patient orders per page',
          },
          patient_id: {
            type: 'number',
            format: 'int32',
            description: 'Location Patient ID',
          },
          patient_master_id: {
            type: 'string',
            format: 'uuid',
            description: 'Patient Master UUID (Important: NOT ID)',
          },
          status: {
            type: 'string',
            enum: ['canceled', 'pending_order_review', 'pending_discontinue_review', 'reviewed'],
            description: 'Patient order status to filter',
          },
          medication_name: {
            type: 'string',
            description: 'Patient order name to filter by',
          },
          created_at_start_date: {
            type: 'string',
            format: 'date',
            description: 'Created at Start Date (Example: 2018-12-01)',
          },
          created_at_end_date: {
            type: 'string',
            format: 'date',
            description: 'Created at End Date (Example: 2018-12-03)',
          },
          updated_at_start_date: {
            type: 'string',
            format: 'date',
            description: 'Updated at Start Date (Example: 2018-12-01)',
          },
          updated_at_end_date: {
            type: 'string',
            format: 'date',
            description: 'Updated at End Date (Example: 2018-12-03)',
          },
          rxcui: {
            type: 'string',
            description: 'RXCUI to filter by',
          },
          ndc: {
            type: 'string',
            description: 'NDC to filter by',
          },
        },
        required: ['patient_id', 'patient_master_id'],
      },
      method: 'get',
      pathTemplate: '/patients/{patient_id}/patient_orders',
      executionParameters: [
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
        { name: 'patient_id', in: 'path' },
        { name: 'patient_master_id', in: 'query' },
        { name: 'status', in: 'query' },
        { name: 'medication_name', in: 'query' },
        { name: 'created_at_start_date', in: 'query' },
        { name: 'created_at_end_date', in: 'query' },
        { name: 'updated_at_start_date', in: 'query' },
        { name: 'updated_at_end_date', in: 'query' },
        { name: 'rxcui', in: 'query' },
        { name: 'ndc', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],

  // Patient Care & History
  [
    'GetPatientsCareTeam',
    {
      name: 'GetPatientsCareTeam',
      description: `List a patient's care team`,
      inputSchema: {
        type: 'object',
        properties: {
          patient_id: {
            type: 'number',
            format: 'int32',
            description: 'Location Patient ID',
          },
          patient_master_id: {
            type: 'string',
            format: 'uuid',
            description: 'Patient Master UUID (Important: NOT ID)',
          },
        },
        required: ['patient_id', 'patient_master_id'],
      },
      method: 'get',
      pathTemplate: '/patients/{patient_id}/care_team',
      executionParameters: [
        { name: 'patient_id', in: 'path' },
        { name: 'patient_master_id', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetPatientsDiagnosisHistory',
    {
      name: 'GetPatientsDiagnosisHistory',
      description: `List a patient's diagnosis history`,
      inputSchema: {
        type: 'object',
        properties: {
          patient_id: {
            type: 'number',
            format: 'int32',
            description: 'Location Patient ID',
          },
          patient_master_id: {
            type: 'string',
            format: 'uuid',
            description: 'Patient Master UUID (Important: NOT ID)',
          },
        },
        required: ['patient_id', 'patient_master_id'],
      },
      method: 'get',
      pathTemplate: '/patients/{patient_id}/diagnosis_history',
      executionParameters: [
        { name: 'patient_id', in: 'path' },
        { name: 'patient_master_id', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetPatientsProgramHistory',
    {
      name: 'GetPatientsProgramHistory',
      description: `List a patient's program history`,
      inputSchema: {
        type: 'object',
        properties: {
          patient_id: {
            type: 'number',
            format: 'int32',
            description: 'Location Patient ID',
          },
          patient_master_id: {
            type: 'string',
            format: 'uuid',
            description: 'Patient Master UUID (Important: NOT ID)',
          },
        },
        required: ['patient_id', 'patient_master_id'],
      },
      method: 'get',
      pathTemplate: '/patients/{patient_id}/program_history',
      executionParameters: [
        { name: 'patient_id', in: 'path' },
        { name: 'patient_master_id', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetPatientsUtilizationReviews',
    {
      name: 'GetPatientsUtilizationReviews',
      description: `List a patient's utilization reviews`,
      inputSchema: {
        type: 'object',
        properties: {
          patient_id: {
            type: 'number',
            format: 'int32',
            description: 'Location Patient ID',
          },
          patient_master_id: {
            type: 'string',
            format: 'uuid',
            description: 'Patient Master UUID (Important: NOT ID)',
          },
        },
        required: ['patient_id', 'patient_master_id'],
      },
      method: 'get',
      pathTemplate: '/patients/{patient_id}/ur',
      executionParameters: [
        { name: 'patient_id', in: 'path' },
        { name: 'patient_master_id', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetPatientsCareTeams',
    {
      name: 'GetPatientsCareTeams',
      description: `List all patients' care teams`,
      inputSchema: {
        type: 'object',
        properties: {
          page: {
            type: 'number',
            format: 'int32',
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            description: 'Patients per page',
          },
          admissions: {
            type: 'string',
            description:
              'Set to "true" to return care teams from Patient Admissions filters. Otherwise, results are from the Patient Census filters',
          },
          start_date: {
            type: 'string',
            format: 'date',
            description: 'Start Date (Example: 2018-12-01); required for "admissions" filtering',
          },
          end_date: {
            type: 'string',
            format: 'date',
            description: 'End Date (Example: 2018-12-03); required for "admissions" filtering',
          },
        },
        required: ['start_date', 'end_date'],
      },
      method: 'get',
      pathTemplate: '/patients/care_teams',
      executionParameters: [
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
        { name: 'admissions', in: 'query' },
        { name: 'start_date', in: 'query' },
        { name: 'end_date', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],

  // Patient Settings & Configuration
  [
    'GetPatientSettings',
    {
      name: 'GetPatientSettings',
      description: `List all patient settings`,
      inputSchema: {
        type: 'object',
        properties: {},
        required: [],
      },
      method: 'get',
      pathTemplate: '/patient_settings',
      executionParameters: [],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetPatientColors',
    {
      name: 'GetPatientColors',
      description: `List all patient colors`,
      inputSchema: {
        type: 'object',
        properties: {},
        required: [],
      },
      method: 'get',
      pathTemplate: '/patient_colors',
      executionParameters: [],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetPatientTags',
    {
      name: 'GetPatientTags',
      description: `List all patient tags`,
      inputSchema: {
        type: 'object',
        properties: {
          page: {
            type: 'number',
            format: 'int32',
            default: 1,
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            default: 20,
            description: 'Patient Tags per page',
          },
        },
        required: [],
      },
      method: 'get',
      pathTemplate: '/patient_tags',
      executionParameters: [
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetPatientDiets',
    {
      name: 'GetPatientDiets',
      description: `List all patient diets`,
      inputSchema: {
        type: 'object',
        properties: {},
        required: [],
      },
      method: 'get',
      pathTemplate: '/patient_diets',
      executionParameters: [],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],

  // Flags & Monitoring
  [
    'GetFlags',
    {
      name: 'GetFlags',
      description: `List all flags`,
      inputSchema: {
        type: 'object',
        properties: {
          page: {
            type: 'number',
            format: 'int32',
            default: 1,
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            default: 20,
            description: 'Flags per page',
          },
        },
        required: [],
      },
      method: 'get',
      pathTemplate: '/flags',
      executionParameters: [
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetFlagCategories',
    {
      name: 'GetFlagCategories',
      description: `List all flag categories`,
      inputSchema: {
        type: 'object',
        properties: {
          page: {
            type: 'number',
            format: 'int32',
            default: 1,
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            default: 20,
            description: 'Flag Categories per page',
          },
        },
        required: [],
      },
      method: 'get',
      pathTemplate: '/flag_categories',
      executionParameters: [
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],

  // Users, Providers & Roles
  [
    'GetUsersById',
    {
      name: 'GetUsersById',
      description: `Fetch a User Record`,
      inputSchema: {
        type: 'object',
        properties: {
          user_id: {
            type: 'string',
            format: 'uuid',
            description: 'User ID (Can be found through the Users index route)',
          },
          include_restrictions: {
            type: 'boolean',
            description: 'Boolean flag to include restricted patients',
          },
        },
        required: ['user_id'],
      },
      method: 'get',
      pathTemplate: '/users/{user_id}',
      executionParameters: [
        { name: 'user_id', in: 'path' },
        { name: 'include_restrictions', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetUsersRoles',
    {
      name: 'GetUsersRoles',
      description: `List all roles scoped to a given user`,
      inputSchema: {
        type: 'object',
        properties: {
          user_id: {
            type: 'string',
            format: 'uuid',
            description: 'User ID (Can be found through the Users index route)',
          },
          page: {
            type: 'number',
            format: 'int32',
            default: 1,
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            default: 20,
            description: 'Roles per page',
          },
        },
        required: ['user_id'],
      },
      method: 'get',
      pathTemplate: '/users/{user_id}/roles',
      executionParameters: [
        { name: 'user_id', in: 'path' },
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetProvidersById',
    {
      name: 'GetProvidersById',
      description: `Fetch a Provider Record`,
      inputSchema: {
        type: 'object',
        properties: {
          provider_id: {
            type: 'string',
            format: 'uuid',
            description: 'Provider ID',
          },
        },
        required: ['provider_id'],
      },
      method: 'get',
      pathTemplate: '/providers/{provider_id}',
      executionParameters: [{ name: 'provider_id', in: 'path' }],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetProvidersRoles',
    {
      name: 'GetProvidersRoles',
      description: `List all roles scoped to a given provider`,
      inputSchema: {
        type: 'object',
        properties: {
          provider_id: {
            type: 'string',
            format: 'uuid',
            description: 'Provider ID',
          },
          page: {
            type: 'number',
            format: 'int32',
            default: 1,
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            default: 20,
            description: 'Appointments per page',
          },
        },
        required: ['provider_id'],
      },
      method: 'get',
      pathTemplate: '/providers/{provider_id}/roles',
      executionParameters: [
        { name: 'provider_id', in: 'path' },
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetRoles',
    {
      name: 'GetRoles',
      description: `List all Roles`,
      inputSchema: {
        type: 'object',
        properties: {
          page: {
            type: 'number',
            format: 'int32',
            default: 1,
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            default: 20,
            description: 'Roles per page',
          },
        },
        required: [],
      },
      method: 'get',
      pathTemplate: '/roles',
      executionParameters: [
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetRolesUsers',
    {
      name: 'GetRolesUsers',
      description: `List all users scoped to a given role`,
      inputSchema: {
        type: 'object',
        properties: {
          role_id: {
            type: 'string',
            format: 'uuid',
            description: 'Role ID (Can be found through the Roles index route)',
          },
          page: {
            type: 'number',
            format: 'int32',
            default: 1,
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            default: 20,
            description: 'Users per page',
          },
        },
        required: ['role_id'],
      },
      method: 'get',
      pathTemplate: '/roles/{role_id}/users',
      executionParameters: [
        { name: 'role_id', in: 'path' },
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],

  // Settings & Configuration
  [
    'GetSettingsPayors',
    {
      name: 'GetSettingsPayors',
      description: `List all payors`,
      inputSchema: {
        type: 'object',
        properties: {
          page: {
            type: 'number',
            format: 'int32',
            default: 1,
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            default: 20,
            description: 'Payors per page',
          },
        },
        required: [],
      },
      method: 'get',
      pathTemplate: '/settings/payors',
      executionParameters: [
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetUserTitles',
    {
      name: 'GetUserTitles',
      description: `List user titles`,
      inputSchema: {
        type: 'object',
        properties: {},
        required: [],
      },
      method: 'get',
      pathTemplate: '/user_titles',
      executionParameters: [],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],

  // Utilization Reviews
  [
    'GetUtilizationReviewsLatest',
    {
      name: 'GetUtilizationReviewsLatest',
      description: `List utilization reviews with updated_at within a date range`,
      inputSchema: {
        type: 'object',
        properties: {
          start_date: {
            type: 'string',
            format: 'date',
            description: 'Start Date (Example: 2018-12-01)',
          },
          end_date: {
            type: 'string',
            format: 'date',
            description: 'End Date (Example: 2018-12-03)',
          },
          page: {
            type: 'number',
            format: 'int32',
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            description: 'Utilization reviews per page',
          },
        },
        required: ['start_date', 'end_date'],
      },
      method: 'get',
      pathTemplate: '/utilization_reviews/latest',
      executionParameters: [
        { name: 'start_date', in: 'query' },
        { name: 'end_date', in: 'query' },
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],

  // Vault Management (Bonus - Soft-deleted records)
  [
    'GetVaultsPatients',
    {
      name: 'GetVaultsPatients',
      description: `Lists all soft-deleted patients`,
      inputSchema: {
        type: 'object',
        properties: {
          start_date: {
            type: 'string',
            format: 'date',
            description: 'Start Date (Example: 2018-12-01)',
          },
          end_date: {
            type: 'string',
            format: 'date',
            description: 'End Date (Example: 2018-12-03)',
          },
          page: {
            type: 'number',
            format: 'int32',
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            description: 'Patients per page',
          },
        },
        required: [],
      },
      method: 'get',
      pathTemplate: '/vaults/patients',
      executionParameters: [
        { name: 'start_date', in: 'query' },
        { name: 'end_date', in: 'query' },
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],

  // Final Missing Tools (Completing 100% Coverage)
  [
    'GetPatientsPatientDiets',
    {
      name: 'GetPatientsPatientDiets',
      description: `List patient diets scoped to a patient`,
      inputSchema: {
        type: 'object',
        properties: {
          patient_id: {
            type: 'number',
            format: 'int32',
            description: 'Location Patient ID',
          },
          patient_master_id: {
            type: 'string',
            format: 'uuid',
            description: 'Patient Master UUID (Important: NOT ID)',
          },
        },
        required: ['patient_id', 'patient_master_id'],
      },
      method: 'get',
      pathTemplate: '/patients/{patient_id}/patient_diets',
      executionParameters: [
        { name: 'patient_id', in: 'path' },
        { name: 'patient_master_id', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
  [
    'GetPatientsAdmissions',
    {
      name: 'GetPatientsAdmissions',
      description: `List admissions within a date range`,
      inputSchema: {
        type: 'object',
        properties: {
          phi_level: {
            type: 'string',
            enum: ['high', 'medium', 'low'],
            description: 'Detail Level',
          },
          start_date: {
            type: 'string',
            format: 'date',
            description: 'Start Date (Example: 2018-12-01)',
          },
          end_date: {
            type: 'string',
            format: 'date',
            description: 'End Date (Example: 2018-12-03)',
          },
          page: {
            type: 'number',
            format: 'int32',
            description: 'Page number',
          },
          per: {
            type: 'number',
            format: 'int32',
            description: 'Patients per page',
          },
          insurance_detail: {
            type: 'string',
            enum: ['v121'],
            description: 'Show insurance detail with phi_level: high',
          },
          demographics_detail: {
            type: 'string',
            enum: ['v121'],
            description: 'Show demographics detail with phi_level: high',
          },
          patient_status_detail: {
            type: 'string',
            enum: ['v121'],
            description: 'Show patient status detail with phi_level: high',
          },
          patient_contacts_detail: {
            type: 'boolean',
            description: 'Show patient contacts detail with phi_level: high',
          },
          location_id: {
            type: 'number',
            format: 'int32',
            description: 'Location ID (Can be found through the Locations index route)',
          },
        },
        required: ['phi_level', 'start_date', 'end_date'],
      },
      method: 'get',
      pathTemplate: '/patients/admissions',
      executionParameters: [
        { name: 'phi_level', in: 'query' },
        { name: 'start_date', in: 'query' },
        { name: 'end_date', in: 'query' },
        { name: 'page', in: 'query' },
        { name: 'per', in: 'query' },
        { name: 'insurance_detail', in: 'query' },
        { name: 'demographics_detail', in: 'query' },
        { name: 'patient_status_detail', in: 'query' },
        { name: 'patient_contacts_detail', in: 'query' },
        { name: 'location_id', in: 'query' },
      ],
      requestBodyContentType: undefined,
      securityRequirements: [{ APIAuth: [] }],
    },
  ],
]);
