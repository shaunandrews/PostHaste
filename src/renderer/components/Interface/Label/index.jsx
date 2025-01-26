import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cn } from "../../../lib/utils"
import styles from "./Label.module.css"

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(styles.label, className)} {...props} />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label } 