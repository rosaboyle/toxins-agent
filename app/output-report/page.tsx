'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"

// This would typically come from an API or database
const reportData = {
  toxins: [
    { 
      name: 'Lead',
      sources: ['Paint pigments', 'Metal alloys'],
      explanation: 'Lead has been historically used in paints for its durability and in metal alloys for its malleability. Despite regulations, it may still be present in older products or imported items.'
    },
    { 
      name: 'Formaldehyde',
      sources: ['Adhesives', 'Preservatives'],
      explanation: 'Formaldehyde is commonly used in adhesives for its bonding properties and as a preservative due to its antimicrobial effects. It\'s often found in composite wood products and some personal care items.'
    },
    { 
      name: 'Phthalates',
      sources: ['Plastics', 'Cosmetics'],
      explanation: 'Phthalates are used to increase the flexibility of plastics and as solvents in cosmetics. They\'re found in a wide range of products from vinyl flooring to personal care items.'
    },
  ],
  diseases: [
    { toxin: 'Lead', diseases: ['Anemia', 'Kidney damage', 'Neurological disorders'] },
    { toxin: 'Formaldehyde', diseases: ['Respiratory issues', 'Skin irritation', 'Eye irritation'] },
    { toxin: 'Phthalates', diseases: ['Hormonal disruption', 'Reproductive issues', 'Liver damage'] },
  ],
  regulations: `The Toxic Substances Control Act (TSCA) of 1976 provides EPA with authority to require reporting, record-keeping and testing requirements, and restrictions relating to chemical substances and/or mixtures. Certain substances are generally excluded from TSCA, including, among others, food, drugs, cosmetics and pesticides.

  The Frank R. Lautenberg Chemical Safety for the 21st Century Act, passed on June 22, 2016, amends the Toxic Substances Control Act and includes mandatory requirement for EPA to evaluate existing chemicals with clear and enforceable deadlines.

  The European Union's Registration, Evaluation, Authorization and Restriction of Chemicals (REACH) regulation, enacted on June 1, 2007, addresses the production and use of chemical substances and their potential impacts on both human health and the environment.`,
  urls: [
    { name: 'EPA - Toxic Substances Control Act (TSCA)', url: 'https://www.epa.gov/laws-regulations/summary-toxic-substances-control-act' },
    { name: 'EU REACH Regulation', url: 'https://echa.europa.eu/regulations/reach/understanding-reach' },
    { name: 'WHO - Chemical Safety', url: 'https://www.who.int/health-topics/chemical-safety' },
  ]
}

export default function OutputReportPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Industry Analysis Report</h1>
      
      <Accordion type="single" collapsible onValueChange={setActiveSection}>
        <AccordionItem value="toxins">
          <AccordionTrigger>1. Possible Toxins and Their Sources</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Toxin</TableHead>
                      <TableHead>Potential Sources</TableHead>
                      <TableHead>Explanation</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportData.toxins.map((toxin, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{toxin.name}</TableCell>
                        <TableCell>{toxin.sources.join(', ')}</TableCell>
                        <TableCell>{toxin.explanation}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="diseases">
          <AccordionTrigger>2. Related Diseases</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Toxin</TableHead>
                      <TableHead>Related Diseases</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportData.diseases.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.toxin}</TableCell>
                        <TableCell>{item.diseases.join(', ')}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="regulations">
          <AccordionTrigger>3. Relevant Regulations</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent>
                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                  <p className="text-sm">{reportData.regulations}</p>
                </ScrollArea>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Relevant Resources</CardTitle>
          <CardDescription>Links to official regulations and toxin information</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {reportData.urls.map((item, index) => (
              <li key={index}>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

