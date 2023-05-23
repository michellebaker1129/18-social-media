# 18-social-media

<!-- user = student
course = thought

when i delete a user i want to delete all their thoughts
delete user
update user
delete thought
update thought

add reaction 
add friend


//looks like my plan here 

// Delete a student and remove them from the course
  deleteStudent(req, res) {
    Student.findOneAndRemove({ _id: req.params.studentId })
      .then((student) =>
        !student
          ? res.status(404).json({ message: 'No such student exists' })
          : Course.findOneAndUpdate(
              { students: req.params.studentId },
              { $pull: { students: req.params.studentId } },
              { new: true }
            )
      )
      .then((course) =>
        !course
          ? res.status(404).json({
              message: 'Student deleted, but no courses found',
            })
          : res.json({ message: 'Student successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

    // Delete a course
  deleteCourse(req, res) {
    Course.findOneAndDelete({ _id: req.params.courseId })
      .then((course) =>
        !course
          ? res.status(404).json({ message: 'No course with that ID' })
          : Student.deleteMany({ _id: { $in: course.students } })
      )
      .then(() => res.json({ message: 'Course and students deleted!' }))
      .catch((err) => res.status(500).json(err));
  }, -->

## Order of operation

1. Users
   1. POST new user, save [user ID] (do this twice to have two IDs)
   2. POST add a friend by [user ID] and [friend user ID]
   3. GET all users
   4. GET user by [user ID]
   5. UPDATE user by [user ID]
   6. DELETE remove friend by [user ID] and [friend user ID]
   7. DELETE user by [friend user ID], keep [user ID]
2. Thoughts
   1. POST new thought using [user ID], save [thought ID]
   2. POST new reaction, using [thought ID] and [user ID], save [reaction ID]
   3. GET all thoughts
   4. GET thought by [thought ID]
   5. UPDATE thought by [thought ID] (pass new thoughtText)
   6. DELETE reaction by [thought ID] and [reaction ID]
   7. DELETE thought by [thought ID]
