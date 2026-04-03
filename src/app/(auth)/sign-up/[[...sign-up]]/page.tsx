import { SignUp } from "@clerk/nextjs";

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const scanId = typeof params.scanId === "string" ? params.scanId : undefined;
  const fallbackRedirectUrl = scanId
    ? `/dashboard?linkScan=${scanId}`
    : "/dashboard";

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp
        fallbackRedirectUrl={fallbackRedirectUrl}
      />
    </div>
  );
}
