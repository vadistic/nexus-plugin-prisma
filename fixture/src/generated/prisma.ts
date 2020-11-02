import * as Prisma from '@prisma/client'
import { PrismaCrud } from '@vadistic/nexus-plugin-prisma'

export interface PrismaModels {
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
}

export interface PrismaMethods {
  tag: PrismaCrud<'Tag'>
  query: PrismaCrud<'Query'>
  application: PrismaCrud<'Application'>
  candidate: PrismaCrud<'Candidate'>
  client: PrismaCrud<'Client'>
  fieldDefinition: PrismaCrud<'FieldDefinition'>
  fieldValue: PrismaCrud<'FieldValue'>
  pipeline: PrismaCrud<'Pipeline'>
  stage: PrismaCrud<'Stage'>
  review: PrismaCrud<'Review'>
  workspace: PrismaCrud<'Workspace'>
  user: PrismaCrud<'User'>
  account: PrismaCrud<'Account'>
  node: PrismaCrud<'Node'>
  job: PrismaCrud<'Job'>
  location: PrismaCrud<'Location'>
  source: PrismaCrud<'Source'>
  comment: PrismaCrud<'Comment'>
  appointment: PrismaCrud<'Appointment'>
  event: PrismaCrud<'Event'>
  notification: PrismaCrud<'Notification'>
  test: PrismaCrud<'Test'>
}

export interface PrismaMappings {
  Tag: {
    id: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    name: 'String'
    description: 'String'
    candidates: 'Candidate'  
  }
  Query: {
    tag: 'Tag'
    tags: 'Tag'  
  }
  Application: {
    id: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'  
  }
  Candidate: {
    id: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    firstName: 'String'
    lastName: 'String'
    headline: 'String'
    phones: 'String'
    links: 'String'
    emails: 'String'  
  }
  Client: {
    id: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'  
  }
  FieldDefinition: {
    id: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    name: 'String'
    description: 'String'
    type: 'FieldType'  
  }
  FieldValue: {
    value: 'Json'
    definition: 'FieldDefinition'  
  }
  Pipeline: {
    id: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'  
  }
  Stage: {
    id: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'  
  }
  Review: {
    id: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    score: 'Int'
    message: 'String'
    stage: 'Stage'
    application: 'Application'
    author: 'User'  
  }
  Workspace: {
    id: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    name: 'String'
    description: 'String'
    website: 'String'
    type: 'WorkspaceType'  
  }
  User: {
    id: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'  
  }
  Account: {
    id: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    workspaces: 'Workspace'  
  }
}

export interface PrismaOutputs {
  Node: {
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
  }
  Workspace: {
    id: 'String'
    node: 'Node'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    deletedAt: 'DateTime'
    name: 'String'
    description: 'String'
    website: 'String'
    type: 'WorkspaceType'
    users: 'User'
    clients: 'Client'
    candidates: 'Candidate'
    applications: 'Application'
    jobs: 'Job'
    tags: 'Tag'
    sources: 'Source'
    comments: 'Comment'
    pipelines: 'Pipeline'
    stages: 'Stage'
    locations: 'Location'
    reviews: 'Review'
    event: 'Event'
    appointment: 'Appointment'
    notification: 'Notification'
    fields: 'FieldDefinition'  
  }
  User: {
    id: 'String'
    node: 'Node'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    deletedAt: 'DateTime'
    email: 'String'
    avatarUrl: 'String'
    workspaces: 'Workspace'
    comments: 'Comment'
    reviews: 'Review'
    appointments: 'Appointment'  
  }
  Pipeline: {
    id: 'String'
    wid: 'String'
    node: 'Node'
    workspace: 'Workspace'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    deletedAt: 'DateTime'
    stages: 'Stage'  
  }
  Stage: {
    id: 'String'
    wid: 'String'
    node: 'Node'
    workspace: 'Workspace'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    deletedAt: 'DateTime'
    pipeline: 'Pipeline'
    pipelineId: 'String'
    applications: 'Application'
    reviews: 'Review'  
  }
  Review: {
    id: 'String'
    node: 'Node'
    wid: 'String'
    workspace: 'Workspace'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    deletedAt: 'DateTime'
    message: 'String'
    score: 'Int'
    author: 'User'
    authorId: 'String'
    application: 'Application'
    applicationId: 'String'
    stage: 'Stage'
    stageId: 'String'  
  }
  Client: {
    id: 'String'
    node: 'Node'
    wid: 'String'
    workspace: 'Workspace'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    deletedAt: 'DateTime'
    name: 'String'
    description: 'String'
    jobs: 'Job'  
  }
  Candidate: {
    id: 'String'
    node: 'Node'
    wid: 'String'
    workspace: 'Workspace'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    deletedAt: 'DateTime'
    firstName: 'String'
    lastName: 'String'
    headline: 'String'
    emails: 'String'
    links: 'String'
    phones: 'String'
    tags: 'Tag'
    applications: 'Application'
    fields: 'FieldValue'  
  }
  FieldDefinition: {
    id: 'String'
    node: 'Node'
    wid: 'String'
    workspace: 'Workspace'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    deletedAt: 'DateTime'
    name: 'String'
    description: 'String'
    type: 'FieldType'
    values: 'FieldValue'  
  }
  FieldValue: {
    value: 'Json'
    definition: 'FieldDefinition'
    definitionId: 'String'
    candidate: 'Candidate'
    candidateId: 'String'  
  }
  Application: {
    id: 'String'
    node: 'Node'
    wid: 'String'
    workspace: 'Workspace'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    deletedAt: 'DateTime'
    job: 'Job'
    jobId: 'String'
    candidate: 'Candidate'
    candidateId: 'String'
    source: 'Source'
    sourceId: 'String'
    stage: 'Stage'
    stageId: 'String'
    reviews: 'Review'  
  }
  Job: {
    id: 'String'
    node: 'Node'
    wid: 'String'
    workspace: 'Workspace'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    deletedAt: 'DateTime'
    name: 'String'
    description: 'String'
    status: 'JobStatus'
    client: 'Client'
    clientId: 'String'
    applications: 'Application'
    locations: 'Location'  
  }
  Location: {
    id: 'String'
    node: 'Node'
    wid: 'String'
    workspace: 'Workspace'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    deletedAt: 'DateTime'
    name: 'String'
    description: 'String'
    country: 'String'
    city: 'String'
    jobs: 'Job'  
  }
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
  Source: {
    id: 'String'
    wid: 'String'
    node: 'Node'
    workspace: 'Workspace'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    deletedAt: 'DateTime'
    name: 'String'
    description: 'String'
    applications: 'Application'  
  }
  Comment: {
    id: 'String'
    wid: 'String'
    node: 'Node'
    workspace: 'Workspace'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    deletedAt: 'DateTime'
    message: 'String'
    author: 'User'
    authorId: 'String'
    parent: 'Comment'
    parentId: 'String'
    replies: 'Comment'  
  }
  Appointment: {
    id: 'String'
    node: 'Node'
    wid: 'String'
    workspace: 'Workspace'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    deletedAt: 'DateTime'
    name: 'String'
    description: 'String'
    owner: 'User'
    ownerId: 'String'  
  }
  Event: {
    id: 'String'
    wid: 'String'
    node: 'Node'
    workspace: 'Workspace'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    deletedAt: 'DateTime'  
  }
  Notification: {
    id: 'String'
    node: 'Node'
    wid: 'String'
    workspace: 'Workspace'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    deletedAt: 'DateTime'  
  }
  Test: {
    id: 'String'
    node: 'Node'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    deletedAt: 'DateTime'
    value: 'String'  
  }
}

declare global {
  export interface PrismaGen {
    outputs: PrismaOutputs
    models: PrismaModels
    mappings: PrismaMappings
    methods: PrismaMethods
  }
}