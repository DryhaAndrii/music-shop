'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BreadCrumb } from "@/types/breadCrumb";

const SPACE_REGEX = / /g;

export default function useCheckUrl(breadCrumbs: BreadCrumb[]) {
    const router = useRouter();

    useEffect(() => {
        if (breadCrumbs && breadCrumbs.length > 0) {
            checkUrl();
        }
    }, [breadCrumbs]);

    function checkUrl() {
        const url = breadCrumbs.map((breadCrumb: BreadCrumb) =>
            breadCrumb.title.replace(SPACE_REGEX, "_")
        ).join('/');

        const currentPath = window.location.pathname;
        if (currentPath !== `/${url}`) {
            console.log('moving to ' + url);
            router.push(`/${url}`);
        }
    }
}