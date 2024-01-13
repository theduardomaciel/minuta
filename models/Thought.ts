import Realm, { BSON, ObjectSchema } from "realm";

/**
 * The `Task` data model.
 *
 * @note
 * This app uses the `@realm/babel-plugin` plugin, thus we can define a Realm
 * Object by simply defining the properties on the class with the correct types
 * and have the plugin convert it to a correct Realm schema automatically.
 * If you are not using the plugin, you need to define a `static schema: ObjectSchema`
 * on this class in addition to the already defined properties.
 *
 * @see
 * - Define a model: {@link https://www.mongodb.com/docs/realm/sdk/react-native/model-data/define-a-realm-object-model/}
 * - Babel plugin: {@link https://www.npmjs.com/package/@realm/babel-plugin}
 */
export class Thought extends Realm.Object<Thought> {
	_id: BSON.ObjectId = new BSON.ObjectId();
	content!: string;
	isDraft: boolean = true;
	createdAt: Date = new Date();
	userId!: string;

	static primaryKey = "_id";

	static schema: ObjectSchema = {
		name: "Thought",
		properties: {
			_id: "objectId",
			content: "string",
			isDraft: "bool",
			createdAt: "date",
			userId: "string",
		},
	};
}
