import * as React from "react"
import { cn } from "../../../lib/utils"
import styles from "./Input.module.css"

const Input = React.forwardRef(({ className, type, icon, ...props }, ref) => {
  return (
    <div className={styles.wrapper}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <input
        type={type}
        className={cn(
          styles.input,
          icon && styles.hasIcon,
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  )
})
Input.displayName = "Input"

export { Input } 