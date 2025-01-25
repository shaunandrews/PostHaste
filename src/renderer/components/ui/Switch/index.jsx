import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "../../../lib/utils"
import styles from "./Switch.module.css"

const Switch = React.forwardRef(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn("peer", styles.root, className)}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={styles.thumb}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch } 