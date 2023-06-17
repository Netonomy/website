"use client"

import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion"
import Fade from "react-reveal/Fade"

import useSystemTheme from "@/hooks/useSystemTheme"
import { Button } from "@/components/ui/button"

export default function Landing() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["85vh", "5vh"])
  const systemTheme = useSystemTheme()

  return (
    <div className="min-h-screen w-screen">
      <div className="absolute top-0 right-0">
        {systemTheme === "dark" ? (
          <Image
            src={"/bigKeyBlack.png"}
            alt="Big White Key"
            height={800}
            width={800}
            priority
          />
        ) : (
          <Image
            src={"/bigKeyWhiteTop.svg"}
            alt="Big White Key"
            height={800}
            width={800}
            priority
          />
        )}
      </div>

      <div className="absolute bottom-[85px] left-5 lg:left-20 z-40 ">
        <h1 className=" font-extrabold text-6xl md:text-8xl min-w-max flex ">
          netonomy
        </h1>

        <p className="leading-7 [&:not(:first-child)] max-w-xs sm:max-w-sm md:max-w-lg xl:max-w-3xl">
          Your data stored by you for you
        </p>
      </div>

      <div className="flex absolute top-[85px] right-6 flex-col ">
        <Button
          variant="ghost"
          className="font-extrabold justify-start text-xl"
        >
          launch web app
        </Button>

        <Button
          variant="ghost"
          className="font-extrabold justify-start text-xl"
        >
          about
        </Button>
      </div>

      <div className="flex absolute bottom-[85px] right-6  flex-col ">
        <Link href={"https://twitter.com/NetonomyInc"} target="_blank">
          <motion.div whileTap={{ scale: 0.97 }}>
            <Button
              variant="ghost"
              className="font-extrabold justify-start text-xl hover:bg-transparent"
            >
              <Image
                src={"/twitterButton.svg"}
                alt="twitter"
                height={60}
                width={60}
              />
            </Button>
          </motion.div>
        </Link>
      </div>
    </div>
  )
}
