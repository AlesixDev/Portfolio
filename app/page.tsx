import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Projects } from "@/components/sections/projects"
import { Repos } from "@/components/sections/repos"
import { Skills } from "@/components/sections/skills"
import { Contact } from "@/components/sections/contact"

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Repos />
      <Skills />
      <Contact />
    </>
  )
}
