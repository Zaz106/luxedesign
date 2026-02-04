"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Pricing.module.css";
import {
  FigmaIcon,
  NextJsIcon,
  TypescriptIcon,
  AdobeIllustratorIcon,
  PhotoshopIcon,
  ElectronIcon,
  VercelIcon,
  StripeIcon,
} from "../../ui/Icons";

type Currency = "ZAR" | "USD" | "AUD" | "EUR" | "GBP" | "CAD";

const currencies: Record<
  Currency,
  { label: string; symbol: string; hostingPrice: string; flag: React.ReactNode }
> = {
  ZAR: {
    label: "ZAR",
    symbol: "R",
    hostingPrice: "299.99",
    flag: (
      <svg
        viewBox="0 0 36 36"
        width="20"
        height="20"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        preserveAspectRatio="xMidYMid meet"
        fill="#000000"
      >
        <g strokeWidth="0"></g>
        <g strokeLinecap="round" strokeLinejoin="round"></g>
        <g>
          <path fill="#DE3830" d="M32 5H6.5L19 13.5h17V9a4 4 0 0 0-4-4z"></path>
          <path
            fill="#002395"
            d="M6.5 31H32a4 4 0 0 0 4-4v-4.5H19L6.5 31z"
          ></path>
          <path fill="#141414" d="M0 11v14l10.5-7z"></path>
          <path fill="#FFB611" d="M0 9v2l10.5 7L0 25v2l13.5-9z"></path>
          <path
            fill="#007A4D"
            d="M3.541 5.028A4 4 0 0 0 0 9l13.5 9L0 27a4 4 0 0 0 3.541 3.972L18.5 20.5H36v-5H18.5L3.541 5.028z"
          ></path>
          <path
            fill="#EEE"
            d="M6.5 5H4c-.156 0-.308.011-.459.028L18.5 15.5H36v-2H19L6.5 5zM3.541 30.972c.151.017.303.028.459.028h2.5L19 22.5h17v-2H18.5L3.541 30.972z"
          ></path>
        </g>
      </svg>
    ),
  },
  USD: {
    label: "USD",
    symbol: "$",
    hostingPrice: "19.99",
    flag: (
      <svg
        viewBox="0 -4 28 28"
        width="20"
        height="20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g strokeWidth="0"></g>
        <g strokeLinecap="round" strokeLinejoin="round"></g>
        <g>
          {" "}
          <g clipPath="url(#clip0_USD)">
            {" "}
            <rect width="28" height="20" rx="2" fill="white"></rect>{" "}
            <mask
              id="mask0_USD"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="28"
              height="20"
            >
              {" "}
              <rect width="28" height="20" rx="2" fill="white"></rect>{" "}
            </mask>{" "}
            <g mask="url(#mask0_USD)">
              {" "}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M28 0H0V1.33333H28V0ZM28 2.66667H0V4H28V2.66667ZM0 5.33333H28V6.66667H0V5.33333ZM28 8H0V9.33333H28V8ZM0 10.6667H28V12H0V10.6667ZM28 13.3333H0V14.6667H28V13.3333ZM0 16H28V17.3333H0V16ZM28 18.6667H0V20H28V18.6667Z"
                fill="#D02F44"
              ></path>{" "}
              <rect width="12" height="9.33333" fill="#46467F"></rect>{" "}
              <g filter="url(#filter0_d_USD)">
                {" "}
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.66665 1.99999C2.66665 2.36818 2.36817 2.66666 1.99998 2.66666C1.63179 2.66666 1.33331 2.36818 1.33331 1.99999C1.33331 1.63181 1.63179 1.33333 1.99998 1.33333C2.36817 1.33333 2.66665 1.63181 2.66665 1.99999ZM5.33331 1.99999C5.33331 2.36818 5.03484 2.66666 4.66665 2.66666C4.29846 2.66666 3.99998 2.36818 3.99998 1.99999C3.99998 1.63181 4.29846 1.33333 4.66665 1.33333C5.03484 1.33333 5.33331 1.63181 5.33331 1.99999ZM7.33331 2.66666C7.7015 2.66666 7.99998 2.36818 7.99998 1.99999C7.99998 1.63181 7.7015 1.33333 7.33331 1.33333C6.96512 1.33333 6.66665 1.63181 6.66665 1.99999C6.66665 2.36818 6.96512 2.66666 7.33331 2.66666ZM10.6666 1.99999C10.6666 2.36818 10.3682 2.66666 9.99998 2.66666C9.63179 2.66666 9.33331 2.36818 9.33331 1.99999C9.33331 1.63181 9.63179 1.33333 9.99998 1.33333C10.3682 1.33333 10.6666 1.63181 10.6666 1.99999ZM3.33331 3.99999C3.7015 3.99999 3.99998 3.70152 3.99998 3.33333C3.99998 2.96514 3.7015 2.66666 3.33331 2.66666C2.96512 2.66666 2.66665 2.96514 2.66665 3.33333C2.66665 3.70152 2.96512 3.99999 3.33331 3.99999ZM6.66665 3.33333C6.66665 3.70152 6.36817 3.99999 5.99998 3.99999C5.63179 3.99999 5.33331 3.70152 5.33331 3.33333C5.33331 2.96514 5.63179 2.66666 5.99998 2.66666C6.36817 2.66666 6.66665 2.96514 6.66665 3.33333ZM8.66665 3.99999C9.03484 3.99999 9.33331 3.70152 9.33331 3.33333C9.33331 2.96514 9.03484 2.66666 8.66665 2.66666C8.29846 2.66666 7.99998 2.96514 7.99998 3.33333C7.99998 3.70152 8.29846 3.99999 8.66665 3.99999ZM10.6666 4.66666C10.6666 5.03485 10.3682 5.33333 9.99998 5.33333C9.63179 5.33333 9.33331 5.03485 9.33331 4.66666C9.33331 4.29847 9.63179 3.99999 9.99998 3.99999C10.3682 3.99999 10.6666 4.29847 10.6666 4.66666ZM7.33331 5.33333C7.7015 5.33333 7.99998 5.03485 7.99998 4.66666C7.99998 4.29847 7.7015 3.99999 7.33331 3.99999C6.96512 3.99999 6.66665 4.29847 6.66665 4.66666C6.66665 5.03485 6.96512 5.33333 7.33331 5.33333ZM5.33331 4.66666C5.33331 5.03485 5.03484 5.33333 4.66665 5.33333C4.29846 5.33333 3.99998 5.03485 3.99998 4.66666C3.99998 4.29847 4.29846 3.99999 4.66665 3.99999C5.03484 3.99999 5.33331 4.29847 5.33331 4.66666ZM1.99998 5.33333C2.36817 5.33333 2.66665 5.03485 2.66665 4.66666C2.66665 4.29847 2.36817 3.99999 1.99998 3.99999C1.63179 3.99999 1.33331 4.29847 1.33331 4.66666C1.33331 5.03485 1.63179 5.33333 1.99998 5.33333ZM3.99998 5.99999C3.99998 6.36819 3.7015 6.66666 3.33331 6.66666C2.96512 6.66666 2.66665 6.36819 2.66665 5.99999C2.66665 5.6318 2.96512 5.33333 3.33331 5.33333C3.7015 5.33333 3.99998 5.6318 3.99998 5.99999ZM5.99998 6.66666C6.36817 6.66666 6.66665 6.36819 6.66665 5.99999C6.66665 5.6318 6.36817 5.33333 5.99998 5.33333C5.63179 5.33333 5.33331 5.6318 5.33331 5.99999C5.33331 6.36819 5.63179 6.66666 5.99998 6.66666ZM9.33331 5.99999C9.33331 6.36819 9.03484 6.66666 8.66665 6.66666C8.29846 6.66666 7.99998 6.36819 7.99998 5.99999C7.99998 5.6318 8.29846 5.33333 8.66665 5.33333C9.03484 5.33333 9.33331 5.6318 9.33331 5.99999ZM9.99998 8C10.3682 8 10.6666 7.70152 10.6666 7.33333C10.6666 6.96514 10.3682 6.66666 9.99998 6.66666C9.63179 6.66666 9.33331 6.96514 9.33331 7.33333C9.33331 7.70152 9.63179 8 9.99998 8ZM7.99998 7.33333C7.99998 7.70152 7.7015 8 7.33331 8C6.96512 8 6.66665 7.70152 6.66665 7.33333C6.66665 6.96514 6.96512 6.66666 7.33331 6.66666C7.7015 6.66666 7.99998 6.96514 7.99998 7.33333ZM4.66665 8C5.03484 8 5.33331 7.70152 5.33331 7.33333C5.33331 6.96514 5.03484 6.66666 4.66665 6.66666C4.29846 6.66666 3.99998 6.96514 3.99998 7.33333C3.99998 7.70152 4.29846 8 4.66665 8ZM2.66665 7.33333C2.66665 7.70152 2.36817 8 1.99998 8C1.63179 8 1.33331 7.70152 1.33331 7.33333C1.33331 6.96514 1.63179 6.66666 1.99998 6.66666C2.36817 6.66666 2.66665 6.96514 2.66665 7.33333Z"
                  fill="url(#paint0_linear_USD)"
                ></path>{" "}
              </g>{" "}
            </g>{" "}
          </g>{" "}
          <defs>
            {" "}
            <filter
              id="filter0_d_USD"
              x="1.33331"
              y="1.33333"
              width="9.33331"
              height="7.66667"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              {" "}
              <feFlood
                floodOpacity="0"
                result="BackgroundImageFix"
              ></feFlood>{" "}
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              ></feColorMatrix>{" "}
              <feOffset dy="1"></feOffset>{" "}
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
              ></feColorMatrix>{" "}
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_USD"
              ></feBlend>{" "}
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_USD"
                result="shape"
              ></feBlend>{" "}
            </filter>{" "}
            <linearGradient
              id="paint0_linear_USD"
              x1="1.33331"
              y1="1.33333"
              x2="1.33331"
              y2="7.99999"
              gradientUnits="userSpaceOnUse"
            >
              {" "}
              <stop stopColor="white"></stop>{" "}
              <stop offset="1" stopColor="#F0F0F0"></stop>{" "}
            </linearGradient>{" "}
            <clipPath id="clip0_USD">
              {" "}
              <rect width="28" height="20" rx="2" fill="white"></rect>{" "}
            </clipPath>{" "}
          </defs>{" "}
        </g>
      </svg>
    ),
  },
  AUD: {
    label: "AUD",
    symbol: "$",
    hostingPrice: "29.99",
    flag: (
      <svg
        viewBox="0 0 36 36"
        width="20"
        height="20"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        preserveAspectRatio="xMidYMid meet"
        fill="#000000"
      >
        <g strokeWidth="0"></g>
        <g strokeLinecap="round" strokeLinejoin="round"></g>
        <g>
          <path
            fill="#00247D"
            d="M32 5H4c-.205 0-.407.015-.604.045l-.004 1.754l-2.73-.004A3.984 3.984 0 0 0 0 9v18a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4z"
          ></path>
          <path
            d="M9 26.023l-1.222 1.129l.121-1.66l-1.645-.251l1.373-.94l-.829-1.443l1.591.488L9 21.797l.612 1.549l1.591-.488l-.83 1.443l1.374.94l-1.645.251l.121 1.66zM27.95 9.562l-.799.738l.079-1.086l-1.077-.164l.899-.615l-.542-.944l1.04.319l.4-1.013l.401 1.013l1.041-.319l-.543.944l.898.615l-1.076.164l.079 1.086zm-4 6l-.799.739l.079-1.086l-1.077-.164l.899-.616l-.542-.944l1.04.319l.4-1.013l.401 1.013l1.041-.319l-.543.944l.898.616l-1.076.164l.079 1.086zm9-2l-.799.739l.079-1.086l-1.077-.164l.899-.616l-.542-.944l1.04.319l.4-1.013l.401 1.013l1.041-.319l-.543.944l.898.616l-1.076.164l.079 1.086zm-5 14l-.799.739l.079-1.086l-1.077-.164l.899-.616l-.542-.944l1.04.319l.4-1.013l.401 1.013l1.041-.319l-.543.944l.898.616l-1.076.164l.079 1.086zM31 16l.294.596l.657.095l-.475.463l.112.655L31 17.5l-.588.309l.112-.655l-.475-.463l.657-.095z"
            fill="#FFF"
          ></path>
          <path
            fill="#00247D"
            d="M19 18V5H4c-.32 0-.604.045-.604.045l-.004 1.754l-2.73-.004S.62 6.854.535 7A3.988 3.988 0 0 0 0 9v9h19z"
          ></path>
          <path
            fill="#EEE"
            d="M19 5h-2.331L12 8.269V5H7v2.569L3.396 5.045a3.942 3.942 0 0 0-1.672.665L6.426 9H4.69L.967 6.391a4.15 4.15 0 0 0-.305.404L3.813 9H0v5h3.885L0 16.766V18h3.332L7 15.432V18h5v-3.269L16.668 18H19v-2.029L16.185 14H19V9h-2.814L19 7.029V5z"
          ></path>
          <path fill="#CF1B2B" d="M11 5H8v5H0v3h8v5h3v-5h8v-3h-8z"></path>
          <path
            fill="#CF1B2B"
            d="M19 5h-1.461L12 8.879V9h1.571L19 5.198zm-17.276.71a4.052 4.052 0 0 0-.757.681L4.69 9h1.735L1.724 5.71zM6.437 14L.734 18h1.727L7 14.822V14zM19 17.802v-1.22L15.313 14H13.57z"
          ></path>
        </g>
      </svg>
    ),
  },
  EUR: {
    label: "EUR",
    symbol: "€",
    hostingPrice: "18.99",
    flag: (
      <svg
        viewBox="0 -4 28 28"
        width="20"
        height="20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g strokeWidth="0"></g>
        <g strokeLinecap="round" strokeLinejoin="round"></g>
        <g>
          {" "}
          <g clipPath="url(#clip0_EUR)">
            {" "}
            <rect width="28" height="20" rx="2" fill="white"></rect>{" "}
            <mask
              id="mask0_EUR"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="28"
              height="20"
            >
              {" "}
              <rect width="28" height="20" rx="2" fill="white"></rect>{" "}
            </mask>{" "}
            <g mask="url(#mask0_EUR)">
              {" "}
              <rect width="28" height="20" fill="#043CAE"></rect>{" "}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.0572 4.27615L14 4.00001L14.9428 4.27615L14.6666 3.33334L14.9428 2.39053L14 2.66668L13.0572 2.39053L13.3333 3.33334L13.0572 4.27615ZM13.0572 17.6095L14 17.3333L14.9428 17.6095L14.6666 16.6667L14.9428 15.7239L14 16L13.0572 15.7239L13.3333 16.6667L13.0572 17.6095ZM20.6666 10.6667L19.7238 10.9428L20 10L19.7238 9.0572L20.6666 9.33334L21.6095 9.0572L21.3333 10L21.6095 10.9428L20.6666 10.6667ZM6.3905 10.9428L7.33331 10.6667L8.27612 10.9428L7.99998 10L8.27612 9.0572L7.33331 9.33334L6.3905 9.0572L6.66665 10L6.3905 10.9428ZM19.7735 7.33334L18.8307 7.60948L19.1068 6.66668L18.8307 5.72387L19.7735 6.00001L20.7163 5.72387L20.4401 6.66668L20.7163 7.60948L19.7735 7.33334ZM7.28367 14.2762L8.22648 14L9.16929 14.2762L8.89314 13.3333L9.16929 12.3905L8.22648 12.6667L7.28367 12.3905L7.55981 13.3333L7.28367 14.2762ZM17.3333 4.89317L16.3905 5.16932L16.6666 4.22651L16.3905 3.2837L17.3333 3.55984L18.2761 3.2837L18 4.22651L18.2761 5.16932L17.3333 4.89317ZM9.72384 16.7163L10.6666 16.4402L11.6095 16.7163L11.3333 15.7735L11.6095 14.8307L10.6666 15.1068L9.72384 14.8307L9.99998 15.7735L9.72384 16.7163ZM19.7735 14L18.8307 14.2762L19.1068 13.3333L18.8307 12.3905L19.7735 12.6667L20.7163 12.3905L20.4401 13.3333L20.7163 14.2762L19.7735 14ZM7.28367 7.60948L8.22648 7.33334L9.16929 7.60948L8.89314 6.66668L9.16929 5.72387L8.22648 6.00001L7.28367 5.72387L7.55981 6.66668L7.28367 7.60948ZM17.3333 16.4402L16.3905 16.7163L16.6666 15.7735L16.3905 14.8307L17.3333 15.1068L18.2761 14.8307L18 15.7735L18.2761 16.7163L17.3333 16.4402ZM9.72384 5.16932L10.6666 4.89317L11.6095 5.16932L11.3333 4.22651L11.6095 3.2837L10.6666 3.55984L9.72384 3.2837L9.99998 4.22651L9.72384 5.16932Z"
                fill="#FFD429"
              ></path>{" "}
            </g>{" "}
          </g>{" "}
          <defs>
            {" "}
            <clipPath id="clip0_EUR">
              {" "}
              <rect width="28" height="20" rx="2" fill="white"></rect>{" "}
            </clipPath>{" "}
          </defs>{" "}
        </g>
      </svg>
    ),
  },
  GBP: {
    label: "GBP",
    symbol: "£",
    hostingPrice: "15.99",
    flag: (
      <svg
        viewBox="0 0 512 512"
        width="20"
        height="20"
        version="1.1"
        id="Layer_GBP"
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        fill="#000000"
      >
        <g strokeWidth="0"></g>
        <g strokeLinecap="round" strokeLinejoin="round"></g>
        <g>
          {" "}
          <path
            style={{ fill: "#41479B" }}
            d="M473.655,88.276H38.345C17.167,88.276,0,105.443,0,126.621V385.38 c0,21.177,17.167,38.345,38.345,38.345h435.31c21.177,0,38.345-17.167,38.345-38.345V126.621 C512,105.443,494.833,88.276,473.655,88.276z"
          ></path>{" "}
          <path
            style={{ fill: "#F5F5F5" }}
            d="M511.469,120.282c-3.022-18.159-18.797-32.007-37.814-32.007h-9.977l-163.54,107.147V88.276h-88.276 v107.147L48.322,88.276h-9.977c-19.017,0-34.792,13.847-37.814,32.007l139.778,91.58H0v88.276h140.309L0.531,391.717 c3.022,18.159,18.797,32.007,37.814,32.007h9.977l163.54-107.147v107.147h88.276V316.577l163.54,107.147h9.977 c19.017,0,34.792-13.847,37.814-32.007l-139.778-91.58H512v-88.276H371.691L511.469,120.282z"
          ></path>{" "}
          <g>
            {" "}
            <polygon
              style={{ fill: "#FF4B55" }}
              points="282.483,88.276 229.517,88.276 229.517,229.517 0,229.517 0,282.483 229.517,282.483 229.517,423.724 282.483,423.724 282.483,282.483 512,282.483 512,229.517 282.483,229.517 "
            ></polygon>{" "}
            <path
              style={{ fill: "#FF4B55" }}
              d="M24.793,421.252l186.583-121.114h-32.428L9.224,410.31 C13.377,415.157,18.714,418.955,24.793,421.252z"
            ></path>{" "}
            <path
              style={{ fill: "#FF4B55" }}
              d="M346.388,300.138H313.96l180.716,117.305c5.057-3.321,9.277-7.807,12.287-13.075L346.388,300.138z"
            ></path>{" "}
            <path
              style={{ fill: "#FF4B55" }}
              d="M4.049,109.475l157.73,102.387h32.428L15.475,95.842C10.676,99.414,6.749,104.084,4.049,109.475z"
            ></path>{" "}
            <path
              style={{ fill: "#FF4B55" }}
              d="M332.566,211.862l170.035-110.375c-4.199-4.831-9.578-8.607-15.699-10.86L300.138,211.862H332.566z"
            ></path>{" "}
          </g>{" "}
        </g>
      </svg>
    ),
  },
  CAD: {
    label: "CAD",
    symbol: "$",
    hostingPrice: "27.99",
    flag: (
      <svg
        version="1.1"
        id="Layer_CAD"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 512 512"
        xmlSpace="preserve"
        fill="#000000"
      >
        <g strokeWidth="0"></g>
        <g strokeLinecap="round" strokeLinejoin="round"></g>
        <g>
          {" "}
          <rect
            x="114.76"
            y="88.277"
            style={{ fill: "#F5F5F5" }}
            width="282.48"
            height="335.45"
          ></rect>{" "}
          <g>
            {" "}
            <path
              style={{ fill: "#FF4B55" }}
              d="M38.345,88.273C17.167,88.273,0,105.44,0,126.618v258.759c0,21.177,17.167,38.345,38.345,38.345 h76.414V88.273H38.345z"
            ></path>{" "}
            <path
              style={{ fill: "#FF4B55" }}
              d="M473.655,88.273h-76.414v335.448h76.414c21.177,0,38.345-17.167,38.345-38.345V126.618 C512,105.44,494.833,88.273,473.655,88.273z"
            ></path>{" "}
            <path
              style={{ fill: "#FF4B55" }}
              d="M309.569,294.757l52.383-29.932l-12.02-6.01c-3.371-1.686-5.301-5.326-4.802-9.063l3.911-29.322 l-22.177,6.452c-4.899,1.426-9.983-1.588-11.085-6.569l-2.124-9.6l-20.823,24.37c-2.886,3.378-8.386,0.798-7.633-3.581 l8.893-51.708l-13.615,3.723c-3.977,1.088-8.177-0.722-10.116-4.36l-14.337-26.871v-0.04l-0.01,0.02l-0.011-0.02v0.04 l-14.337,26.871c-1.941,3.637-6.141,5.447-10.118,4.36l-13.615-3.723l8.893,51.708c0.753,4.378-4.747,6.959-7.634,3.582 l-20.823-24.37l-2.124,9.6c-1.102,4.982-6.186,7.994-11.085,6.569l-22.177-6.452l3.911,29.322c0.499,3.736-1.431,7.377-4.802,9.063 l-12.02,6.009l52.383,29.933c5.426,3.101,7.804,9.677,5.615,15.53l-4.478,11.977l44.885-3.832c2.484-0.212,4.598,1.788,4.525,4.279 l-1.414,48.044h8.828L259,322.71c-0.073-2.492,2.041-4.491,4.525-4.279l44.906,3.834l-4.478-11.977 C301.766,304.434,304.143,297.857,309.569,294.757z"
            ></path>{" "}
          </g>{" "}
        </g>
      </svg>
    ),
  },
};

const websiteIcons = [
  <FigmaIcon key="figma" />,
  <PhotoshopIcon key="ps" />,
  <AdobeIllustratorIcon key="ai" />,
  <NextJsIcon key="next" />,
  <TypescriptIcon key="ts" />,
];

const appIcons = [
  <FigmaIcon key="figma" />,
  <PhotoshopIcon key="ps" />,
  <AdobeIllustratorIcon key="ai" />,
  <ElectronIcon key="electron" />,
  <NextJsIcon key="next" />,
];

const hostingIcons = [<StripeIcon key="stripe" />, <VercelIcon key="vercel" />];

const TechStackGroup = ({ icons }: { icons: React.ReactNode[] }) => (
  <div className={styles.techStackGroup}>
    {icons.map((icon, index) => (
      <div
        key={index}
        className={styles.techStackItem}
        style={{ zIndex: icons.length - index }}
      >
        {icon}
      </div>
    ))}
  </div>
);

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    width="16"
    height="16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g strokeWidth="0"></g>
    <g strokeLinecap="round" strokeLinejoin="round"></g>
    <g>
      <path
        d="M4 12.6111L8.92308 17.5L20 6.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </g>
  </svg>
);

const Pricing = () => {
  const [currency, setCurrency] = useState<Currency>("ZAR");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const getCurrency = async () => {
      try {
        // Check cache first to avoid unnecessary requests
        const cached = localStorage.getItem("user_currency");
        if (cached && (cached in currencies)) {
          setCurrency(cached as Currency);
          return;
        }

        const res = await fetch("https://ipapi.co/currency/");
        if (!res.ok) {
           // Ensure we don't spam the API on failure (e.g. 429)
           throw new Error("Currency fetch failed");
        }
        
        const data = await res.text();
        const curr = data.trim();
        const validCurrency = (curr in currencies) ? (curr as Currency) : "USD";
        
        setCurrency(validCurrency);
        localStorage.setItem("user_currency", validCurrency);
        
      } catch (err) {
        // Silently fail to default (ZAR)
        // console.warn("Could not determine location currency"); 
      }
    };

    getCurrency();
  }, []);

  const selectedCurrency = currencies[currency];

  const handleCurrencySelect = (curr: Currency) => {
    setCurrency(curr);
    setIsOpen(false);
  };

  return (
    <section id="pricing" className={styles.section}>
      <div className={styles.header}>
        <h2>Pricing Options</h2>
        <div className={styles.subtextWrapper}>
          <p>Flexible pricing tailored to your project requirements.</p>
          <div className={styles.currencyWrapper}>
            <button
              className={styles.currencyToggle}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Select Currency"
            >
              {selectedCurrency.flag}
              <span className={styles.currencyCode}>
                {selectedCurrency.label}
              </span>
              <span
                className={`${styles.chevron} ${isOpen ? styles.open : ""}`}
              >
                <svg
                  viewBox="4 6 16 12"
                  width="12"
                  height="10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </g>
                </svg>
              </span>
            </button>

            {isOpen && (
              <div className={styles.dropdown}>
                {(Object.keys(currencies) as Currency[]).map((key) => (
                  <button
                    key={key}
                    className={styles.dropdownItem}
                    onClick={() => handleCurrencySelect(key)}
                  >
                    {currencies[key].flag}
                    <span>{currencies[key].label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {/* Card 1: Website Development */}
        <div className={`${styles.card} ${styles.darkCard}`}>
          <div className={styles.techIcons}>
            <TechStackGroup icons={websiteIcons} />
          </div>
          <h3>Website Development</h3>
          <div className={styles.priceHighlight}>Custom</div>
          <p className={styles.desc}>Custom websites built for you.</p>

          <div className={styles.divider}></div>

          <ul className={styles.features}>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              Full Design in Figma
            </li>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              Responsive Development
            </li>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              CMS Integration
            </li>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              SEO Optimization
            </li>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              Performance Tuning
            </li>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              Analytics Setup
            </li>
          </ul>

          <Link href="#contact" className={styles.whiteButton}>
            Contact Us <span className={styles.arrow} style={{color: "black"}}>↗</span>
          </Link>
        </div>

        {/* Card 2: App Development */}
        <div className={`${styles.card} ${styles.darkCard}`}>
          <div className={styles.techIcons}>
            <TechStackGroup icons={appIcons} />
          </div>
          <h3>App Development</h3>
          <div className={styles.priceHighlight}>Custom</div>
          <p className={styles.desc}>
            Tailored applications designed for scale.
          </p>

          <div className={styles.divider}></div>

          <ul className={styles.features}>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              iOS & Android
            </li>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              Cloud Infrastructure
            </li>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              Secure Authentication
            </li>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              Real-time Data
            </li>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              Push Notifications
            </li>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              App Store Submission
            </li>
          </ul>

          <Link href="#contact" className={styles.whiteButton}>
            Contact Us <span className={styles.arrow} style={{color: "black"}}>↗</span>
          </Link>
        </div>

        {/* Card 3: Hosting */}
        <div className={`${styles.card} ${styles.lightCard}`}>
          <div className={styles.techIcons}>
            <TechStackGroup icons={hostingIcons} />
          </div>
          <h3 style={{ color: "#000" }}>Hosting</h3>
          <div className={styles.priceValue}>
            <span className={styles.currencySymbol}>
              {selectedCurrency.symbol}
            </span>
            {selectedCurrency.hostingPrice}
            <span className={styles.period}>/month</span>
          </div>
          <p className={styles.desc} style={{ color: "rgba(0,0,0,0.7)" }}>
            Reliable, secure hosting with ongoing support.
          </p>

          <div
            className={styles.divider}
            style={{ backgroundColor: "rgba(0,0,0,0.15)" }}
          ></div>

          <ul className={styles.features} style={{ color: "#000" }}>
            <li>
              <span className={styles.checkDark}>
                <CheckIcon />
              </span>{" "}
              99.9% Uptime
            </li>
            <li>
              <span className={styles.checkDark}>
                <CheckIcon />
              </span>{" "}
              SSL Certificates
            </li>
            <li>
              <span className={styles.checkDark}>
                <CheckIcon />
              </span>{" "}
              Daily Backups
            </li>
            <li>
              <span className={styles.checkDark}>
                <CheckIcon />
              </span>{" "}
              24/7 Monitoring
            </li>
            <li>
              <span className={styles.checkDark}>
                <CheckIcon />
              </span>{" "}
              CDN Integration
            </li>
            <li>
              <span className={styles.checkDark}>
                <CheckIcon />
              </span>{" "}
              Priority Support
            </li>
          </ul>

          <Link href="#contact" className={styles.blackButton}>
            Contact Us <span className={styles.arrow} style={{color: "white"}}>↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
