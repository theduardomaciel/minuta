import { useCallback, useState } from "react";
import { Realm, useQuery, useRealm } from "@realm/react";

import { Thought } from "@/models/Thought";

/*
	Provides functions for managing changes to the thoughts in the Realm, such as adding, updating, and deleting thoughts. 
	@param 
	userId The App user's ID if sync is enabled.
*/
export function useThoughtManager(userId = "SYNC_DISABLED") {
	const realm = useRealm();
	const [showDrafts, setShowDrafts] = useState(true);
	const thoughts = useQuery(
		Thought,
		(collection) =>
			showDrafts
				? collection.sorted("createdAt")
				: collection.filtered("isDraft == false").sorted("createdAt"),
		[showDrafts]
	);

	/**
	 * Adds a thought to the database.
	 *
	 * @note
	 * Everything in the function passed to `realm.write()` is a transaction and will
	 * hence succeed or fail together. A transaction is the smallest unit of transfer
	 * in Realm so we want to be mindful of how much we put into one single transaction
	 * and split them up if appropriate (more commonly seen server side). Since clients
	 * may occasionally be online during short time spans we want to increase the probability
	 * of sync participants to successfully sync everything in the transaction, otherwise
	 * no changes propagate and the transaction needs to start over when connectivity allows.
	 */
	const addThought = useCallback(
		(content: string) => {
			if (!content) {
				return;
			}
			realm.write(() => {
				realm.create(Thought, {
					_id: new Realm.BSON.ObjectID(),
					content,
					isDraft: true,
					createdAt: new Date(),
					userId,
				});
			});
		},
		[realm, userId]
	);

	/**
	 * Updates a thought by toggling its `isComplete` status.
	 *
	 * @note
	 * Normally when updating a record in a NoSQL or SQL database, we have to type
	 * a statement that will later be interpreted and used as instructions for how
	 * to update the record. But in Realm, the objects are "live" because they are
	 * actually referencing the object's location in memory on the device (memory mapping).
	 * So rather than typing a statement, we modify the object directly by changing
	 * the property values. If the changes adhere to the schema, Realm will accept
	 * this new version of the object and wherever this object is being referenced
	 * locally will also see the changes "live".
	 */
	const toggleThoughtStatus = useCallback(
		(thought: Thought) => {
			realm.write(() => {
				thought.isDraft = !thought.isDraft;
			});

			// Alternatively if passing the ID as the argument to toggleThoughtStatus:
			// realm.write(() => {
			//   // If the ID is passed as an ObjectId:
			//   const thought = realm.objectForPrimaryKey('Thought', id);
			//   // Or, if the ID is passed as a string:
			//   const thought = realm.objectForPrimaryKey('Thought', Realm.BSON.ObjectId(id));
			//   thought.isComplete = !thought.isComplete;
			// });
		},
		[realm]
	);

	/**
	 * Deletes a thought from the database.
	 */
	const deleteThought = useCallback(
		(thought: Thought) => {
			realm.write(() => {
				realm.delete(thought);

				// Alternatively if passing the ID as the argument to handleDeleteThought:
				// realm.delete(realm.objectForPrimaryKey('Thought', id));
			});
		},
		[realm]
	);

	const toggleShowDrafts = useCallback(() => {
		setShowDrafts(!showDrafts);
	}, [showDrafts]);

	return {
		thoughts,
		addThought,
		toggleThoughtStatus,
		deleteThought,
		showDrafts,
		toggleShowDrafts,
	};
}
