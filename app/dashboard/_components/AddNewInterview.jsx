"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from  "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAiModel'
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { MockInterview} from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';
import moment from 'moment'
function AddNewInterview() {
    const[openDialog,setOpenDialog]=useState(false)
    const[jobPosition,setJobPosition]=useState();
    const[jobDescription,setJobDescription]=useState();
    const[jobExperience,setJobExperience]=useState();
    const[loading,setLoading]=useState(false);
    const[jsonresponse,setJsonResponse]=useState([]);
    const router=useRouter();
    const{user}=useUser();

    const onSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      const inputPrompt = `give ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions and answers in json format, in which you have given Job position: ${jobPosition}, job description: ${jobDescription} and Job Experience: ${jobExperience}, give us question and answer field on json`;
    
      try {
        const result = await chatSession.sendMessage(inputPrompt);
        const responseText = await result.response.text();
        console.log("Raw AI Response:", responseText);
        const mockJsonResponse = responseText.replace('```json', '').replace('```', '');
        console.log("Parsed AI Response:", mockJsonResponse);
    
        setJsonResponse(mockJsonResponse);
    
        if (mockJsonResponse) {
          const resp = await db.insert(MockInterview)
            .values({
              mockId: uuidv4(),
              jsonMockResp: mockJsonResponse,
              jobPostition: jobPosition,
              jobDescription: jobDescription,
              jobExperience: jobExperience,
              createdBy: user?.primaryEmailAddress?.emailAddress,
              createdAt: moment().format('YYYY-MM-DD')
            }).returning({ mockId: MockInterview.mockId });
    
          console.log("Inserted ID:", resp);
    
          if (resp) {
            setOpenDialog(false);
            router.push('/dashboard/interview/' + resp[0]?.mockId);
          }
        } else {
          console.log("Mock JSON response not found.");
        }
      } catch (error) {
        console.error("Error inserting interview:", error);
      }
      
      setLoading(false);
    }
  return (
    <div>
      <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
      onClick={()=>setOpenDialog(true)}>
        <h2 className='text-lg text-center'>+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle className='font-bold text-2 xl'>
      Tell us more about the job you're interviewing for.</DialogTitle>
      <DialogDescription>
        <form onSubmit={onSubmit}>
        <div>
            <h2>Add details about your job position/role , job description and years of experience</h2>
             <div className='mt-7 my-3'>
                <label>Job Role/ Job Position</label>
                <Input placeholder="Ex. Full Stack Developer" required
                onChange={(event)=>setJobPosition(event.target.value)}
                /> 
             </div>
             <div className='my-3'>
                <label>Job Description(In short)</label>
                <Textarea placeholder="Ex. React , Node js , MySql etc." required
                onChange={(event)=>setJobDescription(event.target.value)}/> 
             </div>
             <div className='my-3'>
                <label>Years of Experience</label>
                <Textarea placeholder="Ex.5" type="number" max="100" required
                onChange={(event)=>setJobExperience(event.target.value)}/> 
             </div>
        </div>
        <div className='flex gap-5 justify-end'>
            <Button type="button" variant="ghost"  onClick={()=>setOpenDialog(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading?
              <>
             <LoaderCircle className='animate-spin'/>'Generating From Ai'</>:'Start Interview'  
            }
            </Button>
        </div>
        </form>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
    </div>
  )
}

export default AddNewInterview