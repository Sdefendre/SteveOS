/**
 * Course content data structure with enhanced formatting and moderate-detail educational content
 *
 * This file contains the curriculum structure for the VA Benefits course including:
 * - Course modules with lessons
 * - Educational content for veterans
 * - Progress tracking metadata
 */

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  FileText,
  AlertCircle,
  CheckCircle2,
  Info,
  FileCheck,
  Stethoscope,
  ClipboardList,
  TrendingUp,
  Gavel,
  AlertTriangle,
} from 'lucide-react'

export interface CourseLesson {
  id: string
  title: string
  description: string
  duration: string
  content: React.ReactNode
  order: number
  type: 'article' | 'video'
}

export interface CourseModule {
  id: string
  title: string
  description: string
  duration: string
  lessons: CourseLesson[]
  order: number
}

export interface Course {
  id: string
  title: string
  description: string
  modules: CourseModule[]
}

// Main course configuration
export const course: Course = {
  id: '0-100-rating-course',
  title: '0-100% Service-Connected Disability Rating Course',
  description:
    'The complete blueprint to maximize your service-connected disability rating. Step-by-step strategy from 0% to 100%.',
  modules: [
    {
      id: 'dd214-module',
      title: 'Understanding Your DD-214',
      description: 'Learn how to read and leverage your service record',
      duration: '15 min',
      order: 1,
      lessons: [
        {
          id: 'dd214',
          title: 'Understanding Your DD-214',
          description: 'Learn how to read and leverage your service record',
          duration: '15 min',
          order: 1,
          type: 'article',
          content: (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Your DD-214: The Foundation</h2>
                <p className="text-base leading-relaxed mb-4">
                  Your DD-214 (Certificate of Release or Discharge from Active Duty) is the most
                  important document for your VA claim. This single piece of paper contains critical
                  information that establishes your eligibility and can provide evidence for service
                  connection.
                </p>
              </div>

              <Alert>
                <FileText className="h-4 w-4" />
                <AlertTitle>Why Your DD-214 Matters</AlertTitle>
                <AlertDescription>
                  The VA uses your DD-214 to verify your service, dates, discharge status, and any
                  injuries or conditions documented during service. Errors or missing information
                  can delay or complicate your claim.
                </AlertDescription>
              </Alert>

              <Card>
                <CardHeader>
                  <CardTitle>Essential Information on Your DD-214</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Your dates of service (entry and separation)</li>
                    <li>Your MOS (Military Occupational Specialty) or job code</li>
                    <li>Your discharge type and character of service</li>
                    <li>Awards, decorations, and campaign ribbons</li>
                    <li>Service-connected injuries or conditions noted</li>
                    <li>Military education and training completed</li>
                    <li>Total active service time</li>
                  </ul>
                </CardContent>
              </Card>

              <div>
                <h3 className="text-xl font-semibold mb-3">Key Sections to Review Carefully</h3>
                <div className="space-y-4">
                  <div>
                    <Badge variant="outline" className="mb-2">
                      Block 14 - Military Education
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      Lists your training and education. Can support claims for conditions related
                      to specific job duties or exposure.
                    </p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">
                      Block 18 - Remarks
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      May contain notes about injuries, awards, or special circumstances. Often
                      overlooked but can be valuable evidence.
                    </p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">
                      Block 23 - Type of Separation
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      Shows whether you received an honorable discharge (required for most VA
                      benefits).
                    </p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">
                      Block 30 - Character of Service
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      Confirms your service character. Must be honorable or general under honorable
                      conditions for benefits.
                    </p>
                  </div>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Action Checklist
                  </CardTitle>
                  <CardDescription>Steps to take with your DD-214</CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3 list-decimal list-inside">
                    <li>
                      <strong>Obtain certified copies:</strong> Get at least 2-3 certified copies
                      from the National Archives or your service branch. Keep originals safe.
                    </li>
                    <li>
                      <strong>Review all blocks carefully:</strong> Look for any errors in dates,
                      MOS, discharge type, or character of service.
                    </li>
                    <li>
                      <strong>Document errors immediately:</strong> If you find mistakes, file a
                      DD-215 (Correction to DD-214) with your service branch.
                    </li>
                    <li>
                      <strong>Secure storage:</strong> Keep copies in multiple safe locations (safe
                      deposit box, fireproof safe, with trusted family member).
                    </li>
                    <li>
                      <strong>Make digital copies:</strong> Scan and save PDF copies in secure cloud
                      storage as backup.
                    </li>
                  </ol>
                </CardContent>
              </Card>

              <Alert variant="default">
                <Info className="h-4 w-4" />
                <AlertTitle>Where to Get Your DD-214</AlertTitle>
                <AlertDescription>
                  Request certified copies through the National Archives{' '}
                  <a
                    href="https://www.archives.gov/veterans"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-primary hover:no-underline"
                  >
                    eVetRecs system
                  </a>
                  . Most requests are processed within 10 business days. Keep your service dates and
                  Social Security number ready.
                </AlertDescription>
              </Alert>
            </div>
          ),
        },
      ],
    },
    {
      id: 'service-connected-module',
      title: 'Service-Connected Conditions',
      description: 'Identify and document all service-connected conditions',
      duration: '30 min',
      order: 2,
      lessons: [
        {
          id: 'service-connected',
          title: 'Service-Connected Conditions',
          description: 'Identify and document all service-connected conditions',
          duration: '30 min',
          order: 1,
          type: 'article',
          content: (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">What is Service Connection?</h2>
                <p className="text-base leading-relaxed mb-4">
                  A service-connected condition is an injury or illness that was caused, aggravated,
                  or worsened by your military service. The VA requires three elements to establish
                  service connection, known as the &quot;nexus&quot; requirement.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="h-5 w-5 text-primary" />
                    The Three-Part Nexus Requirement
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      1. Current Diagnosis
                    </Badge>
                    <p className="text-sm">
                      You must have a current, diagnosed medical condition. A doctor must document
                      the condition in your medical records.
                    </p>
                  </div>
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      2. In-Service Event or Injury
                    </Badge>
                    <p className="text-sm">
                      There must be evidence of an injury, illness, or event during your military
                      service. This could be documented in service treatment records, incident
                      reports, or witness statements.
                    </p>
                  </div>
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      3. Medical Nexus
                    </Badge>
                    <p className="text-sm">
                      A medical professional must provide a written opinion linking your current
                      condition to the in-service event. This is the &quot;nexus letter&quot; and is
                      often the critical piece of evidence.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div>
                <h3 className="text-xl font-semibold mb-3">Common Service-Connected Conditions</h3>
                <div className="grid gap-3">
                  <Card>
                    <CardContent className="pt-6">
                      <ul className="space-y-2 text-sm">
                        <li>
                          <strong>Mental Health:</strong> PTSD, depression, anxiety, adjustment
                          disorders, TBI-related conditions
                        </li>
                        <li>
                          <strong>Musculoskeletal:</strong> Back injuries, knee problems, shoulder
                          injuries, joint pain, arthritis
                        </li>
                        <li>
                          <strong>Hearing:</strong> Hearing loss, tinnitus (ringing in ears)
                        </li>
                        <li>
                          <strong>Respiratory:</strong> Asthma, COPD, sleep apnea, sinusitis
                        </li>
                        <li>
                          <strong>Skin Conditions:</strong> Eczema, psoriasis, contact dermatitis
                        </li>
                        <li>
                          <strong>Digestive:</strong> GERD, IBS, ulcers
                        </li>
                        <li>
                          <strong>Chronic Conditions:</strong> Diabetes, hypertension (if related to
                          service)
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck className="h-5 w-5 text-primary" />
                    Documentation Strategy
                  </CardTitle>
                  <CardDescription>What you need to gather</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Medical Records</h4>
                      <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                        <li>All service treatment records (STRs)</li>
                        <li>Private medical records post-service</li>
                        <li>Hospital and emergency room visits</li>
                        <li>Prescription records</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Supporting Documents</h4>
                      <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                        <li>Incident reports from service</li>
                        <li>Performance evaluations mentioning injuries</li>
                        <li>Service records showing hazardous duty</li>
                        <li>Awards or commendations (may mention injuries)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Buddy Statements</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Written statements from fellow service members who witnessed your injury or
                        can attest to changes in your condition. Include:
                      </p>
                      <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                        <li>Their name, rank, service branch, and contact information</li>
                        <li>Specific dates and locations where events occurred</li>
                        <li>Detailed description of what they observed</li>
                        <li>Their relationship to you during service</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Nexus Letter Guidance</AlertTitle>
                <AlertDescription>
                  A strong nexus letter should explicitly state: &quot;It is my medical opinion that
                  the veteran&apos;s [condition] is at least as likely as not caused by or
                  aggravated by their military service.&quot; Work with your doctor to ensure the
                  letter addresses all three nexus elements clearly.
                </AlertDescription>
              </Alert>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Common Documentation Mistakes to Avoid
                </h3>
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Don&apos;t Make These Errors</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      <li>Submitting incomplete medical records</li>
                      <li>Assuming the VA will connect the dots - be explicit</li>
                      <li>Failing to get a nexus letter from a doctor</li>
                      <li>Waiting too long to file (evidence gets harder to find)</li>
                      <li>Not explaining how conditions connect to specific service events</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          ),
        },
      ],
    },
    {
      id: 'cp-exam-module',
      title: 'C&P Exam Mastery',
      description: 'Complete guide to preparing for and acing your C&P exam',
      duration: '45 min',
      order: 3,
      lessons: [
        {
          id: 'cp-exam',
          title: 'C&P Exam Mastery',
          description: 'Complete guide to preparing for and acing your C&P exam',
          duration: '45 min',
          order: 1,
          type: 'article',
          content: (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Mastering Your C&P Exam</h2>
                <p className="text-base leading-relaxed mb-4">
                  The Compensation & Pension (C&P) exam is the most critical part of your claim
                  process. This examination determines your disability rating percentage. Proper
                  preparation can make the difference between approval and denial, or between a low
                  and high rating.
                </p>
              </div>

              <Alert>
                <Stethoscope className="h-4 w-4" />
                <AlertTitle>Why C&P Exams Matter</AlertTitle>
                <AlertDescription>
                  The examiner&apos;s report directly influences the VA rating specialist&apos;s
                  decision. While you can provide medical evidence, the C&P examiner&apos;s opinion
                  often carries significant weight in determining your rating percentage.
                </AlertDescription>
              </Alert>

              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Before the Exam: Preparation Checklist
                </h3>
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <Badge variant="outline" className="mb-2">
                          Medical Records Review
                        </Badge>
                        <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                          <li>Review all your service treatment records</li>
                          <li>Organize private medical records chronologically</li>
                          <li>Highlight key entries that support your claim</li>
                          <li>Bring copies of all relevant documentation</li>
                        </ul>
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-2">
                          Symptom Documentation
                        </Badge>
                        <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                          <li>Write down all current symptoms before the exam</li>
                          <li>Note how symptoms affect daily activities (work, family, hobbies)</li>
                          <li>Describe pain levels and frequency</li>
                          <li>Document your worst days, not just typical days</li>
                        </ul>
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-2">
                          Prepare for Questions
                        </Badge>
                        <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                          <li>Know the date your condition started or worsened</li>
                          <li>Be ready to explain how it connects to service</li>
                          <li>Prepare examples of how it impacts your life</li>
                        </ul>
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-2">
                          Logistics
                        </Badge>
                        <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                          <li>Confirm appointment time and location</li>
                          <li>Bring a support person if allowed (check in advance)</li>
                          <li>Arrive 15 minutes early</li>
                          <li>Bring valid ID and your claim number</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">
                  During the Exam: Communication Strategy
                </h3>
                <Card>
                  <CardHeader>
                    <CardTitle>Effective Communication Techniques</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Describe Your Worst Days</h4>
                      <p className="text-sm text-muted-foreground">
                        Don&apos;t minimize your symptoms or say &quot;I&apos;m fine&quot; when
                        asked how you&apos;re doing. Describe your worst days in detail - when pain
                        is at its peak, when you can&apos;t sleep, when you can&apos;t work. This
                        accurately represents your disability level.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Be Specific and Detailed</h4>
                      <p className="text-sm text-muted-foreground">
                        Instead of &quot;My back hurts,&quot; say &quot;I have constant lower back
                        pain at a 7/10 that prevents me from sitting for more than 20 minutes or
                        standing for more than 15 minutes, and I need to lie down 3-4 times per
                        day.&quot;
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Explain Functional Impact</h4>
                      <p className="text-sm text-muted-foreground">
                        Describe how your condition affects:
                        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                          <li>Your ability to work and earn income</li>
                          <li>Household tasks and daily activities</li>
                          <li>Relationships and family life</li>
                          <li>Sleep and rest</li>
                          <li>Social activities and hobbies</li>
                        </ul>
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Don&apos;t Minimize Symptoms</h4>
                      <p className="text-sm text-muted-foreground">
                        Veterans often downplay their conditions out of habit or pride. The examiner
                        needs to hear the full impact. If you&apos;re having a &quot;good day&quot;
                        during the exam, say so and explain that this isn&apos;t typical.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Remember</AlertTitle>
                <AlertDescription>
                  The examiner works for the VA but is supposed to be objective. Be respectful,
                  honest, and thorough. If you feel the examiner wasn&apos;t thorough or was
                  dismissive, document this and consider requesting a new exam.
                </AlertDescription>
              </Alert>
            </div>
          ),
        },
      ],
    },
    {
      id: 'filing-strategy-module',
      title: 'Claim Filing Strategy',
      description: 'Step-by-step process to file your claim correctly',
      duration: '30 min',
      order: 4,
      lessons: [
        {
          id: 'filing-strategy',
          title: 'Claim Filing Strategy',
          description: 'Step-by-step process to file your claim correctly',
          duration: '30 min',
          order: 1,
          type: 'article',
          content: (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Filing Your Claim: Step by Step</h2>
                <p className="text-base leading-relaxed mb-4">
                  Filing a VA disability claim requires careful preparation and attention to detail.
                  This step-by-step guide will walk you through the process to ensure your claim is
                  complete and accurate from the start.
                </p>
              </div>

              <Alert>
                <ClipboardList className="h-4 w-4" />
                <AlertTitle>Filing Methods</AlertTitle>
                <AlertDescription>
                  You can file your claim online through VA.gov, by mail (VA Form 21-526EZ), or with
                  the help of an accredited VSO (Veterans Service Organization). Online filing is
                  fastest and allows you to track your claim in real-time.
                </AlertDescription>
              </Alert>

              <div>
                <h3 className="text-xl font-semibold mb-4">Step 1: Gather and Organize Evidence</h3>
                <Card>
                  <CardHeader>
                    <CardTitle>Evidence Collection Checklist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Badge variant="secondary" className="mb-2">
                          Service Records
                        </Badge>
                        <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                          <li>DD-214 (Certificate of Release)</li>
                          <li>Service treatment records (STRs)</li>
                          <li>Incident reports</li>
                          <li>Performance evaluations</li>
                        </ul>
                      </div>
                      <div>
                        <Badge variant="secondary" className="mb-2">
                          Medical Records
                        </Badge>
                        <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                          <li>Private doctor records</li>
                          <li>Hospital records</li>
                          <li>Diagnostic test results (X-rays, MRIs, lab work)</li>
                          <li>Prescription records</li>
                        </ul>
                      </div>
                      <div>
                        <Badge variant="secondary" className="mb-2">
                          Supporting Documents
                        </Badge>
                        <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                          <li>Buddy statements (lay statements)</li>
                          <li>Nexus letters from doctors</li>
                          <li>Photos (if relevant to claim)</li>
                          <li>Employment records showing impact</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Timeline Expectations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <p className="text-muted-foreground">
                      <strong>Average processing time:</strong> 90-120 days for initial claims,
                      though complexity and evidence requirements can extend this.
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Fully Developed Claims (FDC):</strong> If you submit all evidence
                      upfront, processing can be faster (60-90 days average).
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Delays can occur if:</strong> Evidence is missing, C&P exams need
                      scheduling, or your case is particularly complex.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ),
        },
      ],
    },
    {
      id: 'maximizing-rating-module',
      title: 'Maximizing Your Rating',
      description: 'Advanced strategies to combine conditions and maximize percentage',
      duration: '45 min',
      order: 5,
      lessons: [
        {
          id: 'maximizing-rating',
          title: 'Maximizing Your Rating',
          description: 'Advanced strategies to combine conditions and maximize percentage',
          duration: '45 min',
          order: 1,
          type: 'article',
          content: (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Maximizing Your Rating Percentage</h2>
                <p className="text-base leading-relaxed mb-4">
                  Understanding how the VA calculates combined disability ratings is crucial to
                  maximizing your benefits. The VA doesn&apos;t simply add percentages together -
                  they use a specific formula that can seem counterintuitive. Learn the system to
                  ensure you&apos;re getting the rating you deserve.
                </p>
              </div>

              <Alert>
                <TrendingUp className="h-4 w-4" />
                <AlertTitle>Why Combined Ratings Matter</AlertTitle>
                <AlertDescription>
                  Most veterans have multiple service-connected conditions. Learning how these
                  combine helps you understand your total rating and identify opportunities to
                  increase it through additional conditions or rating increases.
                </AlertDescription>
              </Alert>

              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Understanding the Combined Rating Formula
                </h3>
                <Card>
                  <CardHeader>
                    <CardTitle>How the VA Combines Ratings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm mb-3">
                        The VA uses a &quot;whole person&quot; concept. They start with 100% (a
                        fully able person) and subtract the disability percentages. Here&apos;s how
                        it works:
                      </p>
                      <ol className="space-y-2 text-sm list-decimal list-inside text-muted-foreground">
                        <li>Start with the highest rated condition</li>
                        <li>Apply it to 100% (if 30%, you&apos;re 30% disabled, 70% able)</li>
                        <li>Apply the next highest rating to the remaining able percentage</li>
                        <li>Continue for all conditions</li>
                        <li>Round to the nearest 10% for final rating</li>
                      </ol>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Example Calculation</h4>
                      <div className="bg-muted p-4 rounded-lg text-sm">
                        <p className="mb-2">
                          <strong>Conditions:</strong> 30% back injury, 20% knee condition, 10%
                          tinnitus
                        </p>
                        <p className="mb-1">Step 1: 30% of 100% = 30% disabled, 70% able</p>
                        <p className="mb-1">Step 2: 20% of 70% = 14% more disabled, 56% able</p>
                        <p className="mb-1">Step 3: 10% of 56% = 5.6% more disabled, 50.4% able</p>
                        <p className="mt-2 font-semibold">
                          Total: 30% + 14% + 5.6% = 49.6% → Rounded to{' '}
                          <strong>50% combined rating</strong>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Key Takeaways
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground">
                    <li>File for all conditions, not just major ones</li>
                    <li>Understand that combined ratings don&apos;t add simply</li>
                    <li>Consider secondary conditions that stem from service-connected ones</li>
                    <li>File for increases if conditions worsen over time</li>
                    <li>Learn the rating criteria for your specific conditions</li>
                    <li>Use the combined rating calculator tools available online to estimate</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          ),
        },
      ],
    },
    {
      id: 'appeals-module',
      title: 'Appeals and Reconsideration',
      description: 'What to do if your claim is denied or underrated',
      duration: '30 min',
      order: 6,
      lessons: [
        {
          id: 'appeals',
          title: 'Appeals and Reconsideration',
          description: 'What to do if your claim is denied or underrated',
          duration: '30 min',
          order: 1,
          type: 'article',
          content: (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">If Your Claim is Denied or Underrated</h2>
                <p className="text-base leading-relaxed mb-4">
                  Denials and low ratings are not the end of your claim. Many successful claims
                  require appeals. Understanding your options and the appeals process is crucial to
                  getting the rating you deserve. This module will guide you through your appeal
                  options and strategies.
                </p>
              </div>

              <Alert>
                <Gavel className="h-4 w-4" />
                <AlertTitle>Don&apos;t Give Up</AlertTitle>
                <AlertDescription>
                  The majority of appeals are successful when veterans address the specific reasons
                  for denial with new evidence or better documentation. A denial is often just a
                  request for more information presented the right way.
                </AlertDescription>
              </Alert>

              <div>
                <h3 className="text-xl font-semibold mb-4">Understanding the Decision Letter</h3>
                <Card>
                  <CardHeader>
                    <CardTitle>How to Read Your Decision</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm mb-3">
                        When you receive a denial or lower-than-expected rating, the VA must explain
                        why. The decision letter will include:
                      </p>
                      <ul className="text-sm space-y-2 list-disc list-inside text-muted-foreground">
                        <li>
                          <strong>What you claimed:</strong> The conditions they evaluated
                        </li>
                        <li>
                          <strong>What was granted/denied:</strong> Specific decisions on each
                          condition
                        </li>
                        <li>
                          <strong>Reasons and bases:</strong> Why they made each decision (this is
                          crucial)
                        </li>
                        <li>
                          <strong>Evidence considered:</strong> What documents they reviewed
                        </li>
                        <li>
                          <strong>Appeal rights:</strong> Your options and deadlines
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Appeal Success Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground">
                    <li>
                      File within one year to preserve your effective date (earliest date benefits
                      can start)
                    </li>
                    <li>Address each specific denial reason with targeted evidence</li>
                    <li>
                      Get strong nexus letters that explicitly state the connection to service
                    </li>
                    <li>Consider supplemental claim first (fastest, allows new evidence)</li>
                    <li>Keep detailed records of all appeal submissions and responses</li>
                    <li>Don&apos;t give up - many successful claims require appeals</li>
                    <li>Use the decision letter as a roadmap for what evidence you need</li>
                  </ul>
                </CardContent>
              </Card>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Effective Date Protection</AlertTitle>
                <AlertDescription>
                  If you file an appeal within one year of the decision, and you eventually win,
                  your benefits will be backdated to your original claim date. This can result in
                  significant back pay. Always file appeals promptly to protect your effective date.
                </AlertDescription>
              </Alert>
            </div>
          ),
        },
      ],
    },
  ],
}

// Helper function to get all lessons across all modules (for backward compatibility)
export function getAllLessons(): CourseLesson[] {
  return course.modules.flatMap((module) => module.lessons)
}

// Legacy export for backward compatibility with existing CoursePlayer
export const courseModules = getAllLessons().map((lesson) => ({
  id: lesson.id,
  title: lesson.title,
  description: lesson.description,
  duration: lesson.duration,
  content: lesson.content,
}))
