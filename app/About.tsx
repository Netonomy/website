"use client"

import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import Fade from "react-reveal/Fade"

import useSystemTheme from "@/hooks/useSystemTheme"
import { Button } from "@/components/ui/button"

export default function About() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["85vh", "5vh"])
  const systemTheme = useSystemTheme()

  return (
    <div className="relative min-h-screen w-screen flex flex-col items-center">
      <div className="absolute top-[85px] left-5 lg:left-20 z-40 flex flex-col gap-10">
        <div className="flex flex-wrap text-5xl md:text-6xl xl:text-8xl">
          <div className="font-light">This is&nbsp;</div>
          <h1 className="font-extrabold min-w-max">netonomy</h1>
        </div>

        <p className="leading-7 [&:not(:first-child)]:mt-6 ml-2 max-w-xs sm:max-w-sm md:max-w-lg md:ml-4 xl:max-w-3xl">
          Welcome to Netonomy, where we are redefining the way you control your
          digital identity, data, and finances. With a powerful blend of
          decentralization and blockchain technology, our upcoming wallet
          application aims to empower individuals and organizations to regain
          control of their digital lives. <br />
          <br />
          As we venture into an era of digital sovereignty, we invite you to
          join us on this journey. Stay tuned for updates as we bring this
          vision to life, empowering you to navigate the digital world with
          privacy, control, and peace of mind.
        </p>

        <Button className="w-52 ml-4 mt-6">Explore the Platform</Button>
      </div>

      <div className="absolute bottom-0 right-0">
        {systemTheme &&
          (systemTheme === "light" ? (
            <Image
              src={"/logo.svg"}
              alt="Big White Key"
              height={800}
              width={800}
              priority
            />
          ) : (
            <Image
              src={"/bigKeyBlack.png"}
              alt="Big White Key"
              height={800}
              width={800}
              priority
            />
          ))}
      </div>
    </div>
  )
}
