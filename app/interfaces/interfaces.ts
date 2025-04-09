interface Building{
    id: number
    name: string
}

interface Sensor{
    id: number
    name: string
}

// Forms: -----------------------------------
type EntityType = "building" | "sensor" | "subscriber";
type ActionType = "add" | "delete";


interface SettingFormProps {
    entityType: EntityType;
    actionType: ActionType;
}

interface SensorData {
  sensor_id: number
  airflow: number
  humidity: number
  pressure: number
  temperature: number
  timestamp: string
}

interface AlertNotification {
    sensor_id: number
    alert_type: string
    date: string
    value: number
}