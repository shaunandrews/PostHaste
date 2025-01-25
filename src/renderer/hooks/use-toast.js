import React from "react";
import { useEffect, useState } from "react";
import { Toast, ToastTitle, ToastDescription } from "../components/ui/toast";

const TOAST_TIMEOUT = 5000;

export function useToast() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setToasts((toasts) =>
        toasts.filter((toast) => toast.timestamp > Date.now() - TOAST_TIMEOUT)
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function toast({ title, description, variant = "default" }) {
    console.log("Creating toast:", { title, description, variant });
    const id = Math.random().toString(36).slice(2);
    const timestamp = Date.now();

    const toastElement = (
      <Toast key={id} variant={variant}>
        <div>
          <ToastTitle>{title}</ToastTitle>
          {description && <ToastDescription>{description}</ToastDescription>}
        </div>
      </Toast>
    );

    setToasts((toasts) => [
      ...toasts,
      {
        id,
        element: toastElement,
        timestamp,
      },
    ]);

    console.log("Current toasts:", toasts);
    return id;
  }

  function dismiss(toastId) {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== toastId));
  }

  return {
    toasts,
    toast,
    dismiss,
  };
}
