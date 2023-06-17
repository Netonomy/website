import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"

import About from "./About"
import Landing from "./Landing"

export default function IndexPage() {
  return (
    <div className="flex flex-col items-center h-screen max-h-[-webkit-fill-available]">
      <Landing />

      {/* <About />   */}
    </div>
  )
}
