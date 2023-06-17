"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion"
import Fade from "react-reveal/Fade"
import { animated, useSpring } from "react-spring"

import useSystemTheme from "@/hooks/useSystemTheme"
import { Button } from "@/components/ui/button"

function clamp(value: any, min: any, max: any) {
  return Math.min(Math.max(value, min), max)
}

export default function Landing() {
  const [scrollY, setScrollY] = useState(0)
  const systemTheme = useSystemTheme()

  const handleWheelScroll = (e: any) => {
    setScrollY((prev) => clamp(prev + e.deltaY, 0, 100))
  }
  const headerPosition = clamp(scrollY, 5, 45)

  const { y } = useSpring({
    from: { y: "5vh" },
    to: { y: `${headerPosition}vh` },
    config: {
      tension: 210,
      friction: 20,
    },
  })

  const { opacity } = useSpring({
    from: { opacity: 1 },
    to: { opacity: scrollY > 50 ? 0 : 1 },
    config: {
      tension: 210,
      friction: 20,
    },
    reverse: scrollY <= 50,
  })

  return (
    <div className="min-h-screen w-screen" onWheel={handleWheelScroll}>
      <div className="absolute top-0 right-0">
        {systemTheme &&
          (systemTheme === "dark" ? (
            <Image
              src={"/bigKeyBlack.png"}
              alt="Big Key"
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
          ))}
      </div>

      {scrollY > 50 ? (
        <animated.div
          className="absolute left-5 lg:left-10 z-4"
          style={{ bottom: y, opacity: opacity.to((o) => 1 - o) }}
        >
          <div className="flex flex-col gap-10">
            <div className="flex flex-wrap text-5xl md:text-6xl xl:text-8xl">
              <div className="font-light">This is&nbsp;</div>
              <h1 className="font-extrabold min-w-max">netonomy</h1>
            </div>

            <p className="leading-7 [&:not(:first-child)]:mt-6 ml-2 max-w-xs sm:max-w-sm md:max-w-lg md:ml-4 xl:max-w-3xl">
              Welcome to Netonomy, where we are redefining the way you control
              your digital identity, data, and finances. With a powerful blend
              of decentralization and blockchain technology, our upcoming wallet
              application aims to empower individuals and organizations to
              regain control of their digital lives. <br />
              <br />
              As we venture into an era of digital sovereignty, we invite you to
              join us on this journey. Stay tuned for updates as we bring this
              vision to life, empowering you to navigate the digital world with
              privacy, control, and peace of mind.
            </p>

            <Button className="w-52 ml-4 mt-6">Explore the Platform</Button>
          </div>
        </animated.div>
      ) : (
        <animated.div
          className="absolute  left-5 lg:left-10 z-40"
          style={{ bottom: y, opacity: opacity.to((o) => o) }}
        >
          <animated.h1 className=" font-extrabold text-6xl md:text-8xl min-w-max flex">
            netonomy
          </animated.h1>

          <p className="leading-7 [&:not(:first-child)] max-w-xs sm:max-w-sm md:max-w-lg xl:max-w-3xl">
            Your data stored by you for you
          </p>
        </animated.div>
      )}

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
