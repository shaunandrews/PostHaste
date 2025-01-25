import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "../../../lib/utils"
import styles from "./Button.module.css"

const buttonVariants = ({ variant = "default", size = "default", className = "" }) => {
  return cn(
    styles.button,
    styles[variant],
    styles[`size-${size}`],
    className
  )
}

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={buttonVariants({ variant, size, className })}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button, buttonVariants } 