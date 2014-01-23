// Declare permission-check functions here
// Use them in extending collection declaration files

// ex.
// check that the userId specified owns the documents
ownsDocument = function(userId, doc) {
  return doc && doc.userId === userId;
};