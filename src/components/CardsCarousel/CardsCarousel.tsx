"use client";
import { Carousel } from "@mantine/carousel";
import {
  Avatar,
  Group,
  Paper,
  ScrollArea,
  Skeleton,
  Text,
  Tooltip,
  TypographyStylesProvider,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import classes from "./CardsCarousel.module.css";

import "@mantine/carousel/styles.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { review, reviewResponse } from "@/lib/types";
import { getReviews } from "@/lib/api";

function Card(props: { review: review }) {
  return (
    <Paper withBorder radius="md" className={classes.comment}>
      <Group className="flex items-center justify-between">
        <Avatar
          src={props.review.picture}
          alt={props.review.name}
          radius="xl"
        />
        <div>
          <Text fz="sm">{props.review.name}</Text>
          <Tooltip label={props.review.date}>
            <Text fz="xs" c="dimmed">
              {props.review.relativeDate}
            </Text>
          </Tooltip>
        </div>
        <GoogleLogo />
      </Group>
      <TypographyStylesProvider className={classes.body}>
        <div className={classes.content}>
          <ScrollArea h={150}>{props.review.content}</ScrollArea>
        </div>
      </TypographyStylesProvider>
    </Paper>
  );
}
function CardPlaceholder() {
  return (
    <Paper withBorder radius="md" className={classes.comment}>
      <Group className="flex items-center justify-between">
        <Skeleton height={38} circle />
        <div>
          <Skeleton height={8} width={100} mt={7} radius="xl" />
          <Skeleton height={8} width={70} mt={10} radius="xl" />
        </div>
        <Skeleton height={24} circle />
      </Group>
      <TypographyStylesProvider className={classes.body}>
        <Skeleton height={8} width="100%" mt={20} radius="xl" />
        <Skeleton height={8} width="100%" mt={13} radius="xl" />
        <Skeleton height={8} width="100%" mt={13} radius="xl" />
        <Skeleton height={8} width="100%" mt={13} radius="xl" />
        <Skeleton height={8} width="70%" mt={13} radius="xl" />
      </TypographyStylesProvider>
    </Paper>
  );
}

const GoogleLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
    <path fill="none" d="M1 1h22v22H1z" />
  </svg>
);

export function CardsCarousel() {
  const mobile = useMediaQuery(`(max-width: 48em)`);

  const [reviews, setReviews] = useState<review[] | undefined>(undefined); // Placeholder for reviews data

  useEffect(() => {
    getReviews().then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setReviews(
            data.reviews.map((review: reviewResponse) => ({
              name: review.authorAttribution.displayName,
              picture: review.authorAttribution.photoUri,
              relativeDate: review.relativePublishTimeDescription,
              date: review.publishTime,
              content: review.text.text,
            })),
          );
        });
      } else {
        console.error("Failed to fetch reviews");
      }
    });
  }, []);

  return (
    <>
      <Carousel
        slideSize={{ base: "100%", sm: "50%", md: "33.33%" }}
        slideGap={3}
        emblaOptions={{ align: "start", slidesToScroll: mobile ? 1 : 2 }}
      >
        {reviews ? (
          reviews.map((review, key) => (
            <Carousel.Slide key={key}>
              <Card review={review} />
            </Carousel.Slide>
          ))
        ) : (
          <>
            <Carousel.Slide>
              <CardPlaceholder />
            </Carousel.Slide>
            <Carousel.Slide>
              <CardPlaceholder />
            </Carousel.Slide>
            <Carousel.Slide>
              <CardPlaceholder />
            </Carousel.Slide>
          </>
        )}
      </Carousel>

      <Text className="text-center text-gray-500 mt-4">
        <Link href="">View all our reviews on Google</Link>
      </Text>
    </>
  );
}
