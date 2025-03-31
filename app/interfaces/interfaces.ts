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