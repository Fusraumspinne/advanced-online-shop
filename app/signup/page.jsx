import Signup from '@/components/Signup'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'

async function page() {
  const session = await getServerSession(authOptions)

  if(session){
    redirect("/shop")
  }

  return (
    <div>
        <Signup/>
    </div>
  )
}

export default page