
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { SettingForm } from "./forms/setting-form"

interface SettingCardProps {
  cardTitle: string
  cardDescription: string
  buttonName: string
  drawerTitle: string
  drawerDescription: string
  entityType: "building" | "sensor" | "subscriber"
}

export default function SettingCard({
  cardTitle,
  cardDescription,
  buttonName,
  drawerTitle,
  drawerDescription,
  entityType,
}: SettingCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <Drawer>
          <DrawerTrigger asChild>
            <Button>{buttonName}</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{drawerTitle}</DrawerTitle>
              <DrawerDescription>{drawerDescription}</DrawerDescription>
            </DrawerHeader>
            <SettingForm entityType={entityType} actionType="add" />
            <DrawerFooter>
              <DrawerClose>Cancel</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </CardContent>
      <CardFooter>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="destructive">Delete {buttonName}</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Delete {drawerTitle}</DrawerTitle>
              <DrawerDescription>Delete {drawerDescription}</DrawerDescription>
            </DrawerHeader>
            <SettingForm entityType={entityType} actionType="delete" />
            <DrawerFooter>
              <DrawerClose>Cancel</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </CardFooter>
    </Card>
  )
}

