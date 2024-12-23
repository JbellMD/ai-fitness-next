"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function ComponentsDemo() {
  return (
    <div className="container py-10 space-y-8">
      <h1 className="text-3xl font-bold">Components Demo</h1>

      {/* Buttons */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Buttons</h2>
        <div className="flex gap-4">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      {/* Card */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Card</h2>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <Button>Action</Button>
          </CardFooter>
        </Card>
      </section>

      {/* Form Controls */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Form Controls</h2>
        <div className="grid gap-4 max-w-sm">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" placeholder="Tell us about yourself" />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
          </div>

          <div className="space-y-2">
            <Label>Notification Method</Label>
            <RadioGroup defaultValue="email">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="r1" />
                <Label htmlFor="r1">Email</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sms" id="r2" />
                <Label htmlFor="r2">SMS</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Theme</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Volume</Label>
            <Slider defaultValue={[50]} max={100} step={1} />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">Airplane Mode</Label>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Tabs</h2>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Account settings here</TabsContent>
          <TabsContent value="password">Change your password here</TabsContent>
        </Tabs>
      </section>

      {/* Loading Spinner */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Loading Spinner</h2>
        <LoadingSpinner />
      </section>
    </div>
  )
}
