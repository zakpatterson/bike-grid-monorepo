// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";
import richDate from "part:@sanity/form-builder/input/rich-date/schema";

// We import object and document schemas
import blockContent from "./blockContent";
import event from "./event";
import organizer from "./organizer";
import media from "./media";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    event,
    organizer,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
    media,
    richDate,
  ]),
});
