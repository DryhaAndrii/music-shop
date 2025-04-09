"use client";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import styles from "./styles.module.scss";
import ToastItem from "./toastItem";
import { ToastType } from "@/types/toastTypes";
import { TOAST_LIFE_TIME } from "@/atoms/toasts";
import { toastsAtom } from "@/atoms/toasts";
import { useAtom } from "jotai";

interface ToastProps {
  toasts: ToastType[];
}

export function Toast({ toasts }: ToastProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return ReactDOM.createPortal(
    <div className={styles.toastContainer}>
      {toasts.map((toast) => {
        const toastClassnames = classNames({
          [styles.toast]: true,
          [styles[`toast--${toast.type}`]]: true,
        });

        return (
          <ToastItem
            type={toast.type}
            lifeTime={TOAST_LIFE_TIME}
            nameOfClass={toastClassnames}
            message={toast.message}
            key={toast.id}
          />
        );
      })}
    </div>,
    document.body
  );
}

export function ToastContainer() {
  const [toasts] = useAtom(toastsAtom);
  return <Toast toasts={toasts} />;
}
