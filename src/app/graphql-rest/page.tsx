import type { Metadata } from "next";
import { GraphQLRestLanding } from "@/components/graphql-rest/ui";

export const metadata: Metadata = {
  title: "GraphQL vs REST - JavaScript 학습 센터",
  description:
    "REST API와 GraphQL의 차이점을 실제 요청/응답 비교로 학습합니다. Over-fetching, Under-fetching, Schema, Resolver 등 핵심 개념을 이해해보세요.",
  keywords: [
    "GraphQL",
    "REST API",
    "Over-fetching",
    "Under-fetching",
    "GraphQL Schema",
    "GraphQL Resolver",
    "API 비교",
    "웹 API",
  ],
  openGraph: {
    title: "GraphQL vs REST | JavaScript 학습 센터",
    description:
      "REST API와 GraphQL의 차이점을 실제 요청/응답 비교로 학습하고 각각의 장단점을 이해합니다",
    type: "website",
    siteName: "JavaScript 학습 센터",
  },
  twitter: {
    card: "summary_large_image",
    title: "GraphQL vs REST | JavaScript 학습 센터",
    description:
      "REST API와 GraphQL의 차이점을 실제 요청/응답 비교로 학습하고 각각의 장단점을 이해합니다",
  },
  alternates: {
    canonical: "/graphql-rest",
  },
};

export default function GraphQLRestPage() {
  return <GraphQLRestLanding />;
}