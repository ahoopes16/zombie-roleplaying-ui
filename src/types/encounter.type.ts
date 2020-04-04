export interface Encounter {
  /** A fun title for the encounter */
  title: string
  /** Some text describing what happens in this encounter */
  description: string
  /** A list of actions the user must take when they hit this encounter */
  actions: string[]
  /** How many times this encounter has been run. Defaults to 0 */
  numberOfRuns: number
  /** The date this document was created. Created by Mongoose */
  createdAt: string
  /** The last date this document was updated. Created by Mongoose */
  updatedAt: string
  /** The version number for this document. Created by Mongoose */
  __v: number
  /** This encounter's Mongo ObjectID */
  _id: string
}
