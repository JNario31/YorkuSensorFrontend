
import SettingCard from "./setting"

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* Each SettingCard is already a Card component, so they should be siblings */}
      <SettingCard
        cardTitle={"Building Settings"}
        cardDescription={"Add or delete building (Input Building Name)"}
        buttonName={"Building"}
        drawerTitle={"Building"}
        drawerDescription={"Add or Delete."}
        entityType={"building"}
      />

      <SettingCard
        cardTitle={"Sensor Settings"}
        cardDescription={"Add or Delete Sensor (Input Building, then Sensor Name)"}
        buttonName={"Sensor"}
        drawerTitle={"Sensor"}
        drawerDescription={"Add or Delete."}
        entityType={"sensor"}
      />

      <SettingCard
        cardTitle={"Subscription Settings"}
        cardDescription={"Subscribe or Unsubscribe from Alert System"}
        buttonName={"Subscription"}
        drawerTitle={"Subscription"}
        drawerDescription={"Subscribe or Unsubscribe"}
        entityType={"subscriber"}
      />
    </div>
  )
}

