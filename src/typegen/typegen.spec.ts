import { testDmmf, testMetadata } from '../../test/utils'

import {
  typegenPrismaModels,
  typegenPrismaOutputs,
  typegenPrismaMappings,
  typegenPrismaMethods,
} from './typegen'

describe('typegen', () => {
  const dmmf = testDmmf()
  const metadata = testMetadata()

  test('models', () => {
    const models = typegenPrismaModels(dmmf)

    expect(models).toMatchInlineSnapshot(`
      "export interface PrismaModels {
        Node: Prisma.Node
        Workspace: Prisma.Workspace
        User: Prisma.User
        Pipeline: Prisma.Pipeline
        Stage: Prisma.Stage
        Review: Prisma.Review
        Client: Prisma.Client
        Candidate: Prisma.Candidate
        FieldDefinition: Prisma.FieldDefinition
        FieldValue: Prisma.FieldValue
        Application: Prisma.Application
        Job: Prisma.Job
        Location: Prisma.Location
        Tag: Prisma.Tag
        Source: Prisma.Source
        Comment: Prisma.Comment
        Appointment: Prisma.Appointment
        Event: Prisma.Event
        Notification: Prisma.Notification
        Test: Prisma.Test
      }"
    `)
  })

  test('outputs', () => {
    const outputs = typegenPrismaOutputs(dmmf)

    expect(outputs.match(/Node: {[\w\n\s:']+}/gm)).toMatchInlineSnapshot(`
      Array [
        "Node: {
          id: 'String'
          user: 'User'
          client: 'Client'
          candidate: 'Candidate'
          application: 'Application'
          job: 'Job'
          tag: 'Tag'
          comment: 'Comment'
          source: 'Source'
          pipeline: 'Pipeline'
          stage: 'Stage'
          location: 'Location'
          review: 'Review'
          event: 'Event'
          appointment: 'Appointment'
          notification: 'Notification'
          field: 'FieldDefinition'
          workspace: 'Workspace'
          test: 'Test'  
        }",
      ]
    `)
  })

  test('mappings', () => {
    const mappings = typegenPrismaMappings(metadata)

    expect(mappings).toMatchInlineSnapshot(`
      "export interface PrismaMappings {
        Tag: {
          id: 'String'
          wid: 'String'
          node: 'Node'
          workspace: 'Workspace'
          createdAt: 'DateTime'
          updatedAt: 'DateTime'
          deletedAt: 'DateTime'
          name: 'String'
          description: 'String'
          types: 'TagType'
          candidates: 'Candidate'  
        }
      }"
    `)
  })

  test('methods', () => {
    const mappings = typegenPrismaMethods(metadata)

    expect(mappings).toMatchInlineSnapshot(`
      "export interface PrismaMethods {
        tag: PrismaCrud<'Tag'>
        node: PrismaCrud<'Node'>
        workspace: PrismaCrud<'Workspace'>
        user: PrismaCrud<'User'>
        pipeline: PrismaCrud<'Pipeline'>
        stage: PrismaCrud<'Stage'>
        review: PrismaCrud<'Review'>
        client: PrismaCrud<'Client'>
        candidate: PrismaCrud<'Candidate'>
        fieldDefinition: PrismaCrud<'FieldDefinition'>
        fieldValue: PrismaCrud<'FieldValue'>
        application: PrismaCrud<'Application'>
        job: PrismaCrud<'Job'>
        location: PrismaCrud<'Location'>
        source: PrismaCrud<'Source'>
        comment: PrismaCrud<'Comment'>
        appointment: PrismaCrud<'Appointment'>
        event: PrismaCrud<'Event'>
        notification: PrismaCrud<'Notification'>
        test: PrismaCrud<'Test'>
      }"
    `)
  })
})
