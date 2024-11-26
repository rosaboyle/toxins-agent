import { Metadata } from 'next'
import { OrganizationSignUpForm } from '@/components/organization-signup-form'

export const metadata: Metadata = {
  title: 'Organization Sign Up',
  description: 'Create a new organization account',
}

export default function OrganizationSignUpPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Organization Sign Up</h1>
      <OrganizationSignUpForm />
    </div>
  )
}

