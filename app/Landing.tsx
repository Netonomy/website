"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { clamp } from "@/utils/clamp"
import { motion } from "framer-motion"
import { animated, useSpring } from "react-spring"

import useSystemTheme from "@/hooks/useSystemTheme"
import { Button } from "@/components/ui/button"

export default function Landing() {
  const [scrollY, setScrollY] = useState(100)
  const systemTheme = useSystemTheme()
  const [startTouchY, setStartTouchY] = useState(null)

  const handleWheelScroll = (e: any) => {
    setScrollY((prev) => clamp(prev - e.deltaY, 0, 100))
  }

  const handleTouchStart = (e: any) => {
    setStartTouchY(e.touches[0].clientY)
  }

  const handleTouchMove = (e: any) => {
    if (startTouchY) {
      const deltaY = e.touches[0].clientY - startTouchY
      setScrollY((prev) => clamp(prev + deltaY, 0, 100))
    }
  }

  const handleTouchEnd = () => {
    setStartTouchY(null)
  }

  const headerPosition = clamp(scrollY, 5, 80)

  const imagePosition = clamp(scrollY, 0, 100)

  const { y, imageY } = useSpring({
    from: { y: "80%", imageY: "0vh" },
    to: {
      y: scrollY ? "80%" : "5%",
      imageY: scrollY ? "0vh" : "50vh", // modify this as per your requirements
    },
    config: {
      tension: 210,
      friction: 20,
    },
  })

  const { opacity } = useSpring({
    from: { opacity: 1 },
    to: { opacity: scrollY < 50 ? 0 : 1 },
    config: {
      tension: 210,
      friction: 20,
    },
    reverse: scrollY >= 50,
  })

  return (
    <div
      className="h-screen max-h-[-webkit-fill-available] w-screen overflow-hidden relative"
      onWheel={handleWheelScroll}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <animated.div
        className="absolute -right-[175px] h-[350px] w-[600px] lg:h-[650px] lg:w-[1200px] lg:-right-[325px]"
        style={{ top: imageY }}
      >
        {systemTheme &&
          (systemTheme === "dark" ? (
            <div className="relative h-full w-full">
              <Image
                // className="absolute -top-[100px] -right-[225px]"
                src={"/bigKeyBlackFull.svg"}
                alt="Big White Key"
                fill
                priority
              />
            </div>
          ) : (
            <div className="relative h-full w-full">
              <Image
                // className="absolute -top-[100px] -right-[225px]"
                src={"/bigKeyWhiteFull.svg"}
                alt="Big White Key"
                fill
                priority
              />
            </div>
          ))}
      </animated.div>

      {scrollY < 50 ? (
        <animated.div
          className="absolute left-5 lg:left-10 z-4"
          style={{ top: y, opacity: opacity.to((o) => 1 - o) }}
        >
          <div className="flex flex-col gap-10">
            <div className="flex flex-wrap items-center">
              <div className="font-extralight text-3xl md:text-5xl xl:text-7xl">
                This is&nbsp;
              </div>
              <h1 className="font-extrabold min-w-max text-5xl md:text-6xl xl:text-8xl">
                netonomy
              </h1>
            </div>

            <p className="leading-7 [&:not(:first-child)] ml-2 max-w-xs sm:max-w-sm md:max-w-lg md:ml-4 xl:max-w-3xl">
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
          className="absolute left-5 lg:left-10 z-40"
          style={{ top: y, opacity: opacity.to((o) => o) }}
        >
          <animated.h1 className=" font-extrabold text-6xl md:text-8xl min-w-max flex ">
            netonomy
          </animated.h1>

          <p className="leading-7 [&:not(:first-child)] max-w-xs sm:max-w-sm md:max-w-lg xl:max-w-3xl">
            Your data stored by you for you
          </p>
        </animated.div>
      )}

      <animated.div
        className="flex absolute top-[55px] right-6 flex-col "
        style={{ opacity: opacity.to((o) => o) }}
      >
        <Button
          variant="ghost"
          className="font-extrabold justify-start text-xl"
        >
          launch web app
        </Button>

        <Button
          variant="ghost"
          className="font-extrabold justify-start text-xl"
          onClick={() => setScrollY(0)}
        >
          about
        </Button>
      </animated.div>

      <animated.div
        className="flex absolute bottom-[15px] lg:bottom-[55px] right-0 lg:right-6 flex-col "
        style={{ opacity: opacity.to((o) => o) }}
      >
        <Link href={"https://twitter.com/NetonomyInc"} target="_blank">
          <motion.div whileTap={{ scale: 0.97 }} whileFocus={{ scale: 0.55 }}>
            <Button
              variant="ghost"
              className="font-extrabold justify-start text-xl hover:bg-transparent"
            >
              <div className="h-[50px] w-[50px] relative lg:h-[60px] lg:w-[60px]">
                <Image src={"/twitterButton.svg"} alt="twitter" fill />
              </div>
            </Button>
          </motion.div>
        </Link>
      </animated.div>
    </div>
  )
}
