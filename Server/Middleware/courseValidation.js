const validateCourse = (req, res, next) => {
  const {
    title,
    thumbnail,
    price,
    discount,
    languages,
    status,
    certificate,
    totalContent,
    schedule,
    hashtags,
    syllabus
  } = req.body;

  // Required fields validation with specific messages
  const missingFields = {
    title: !title,
    thumbnail: !thumbnail,
    price: !price,
    languages: !languages,
    status: !status,
    certificate: !certificate,
    totalContent: !totalContent,
    schedule: !schedule,
    syllabus: !syllabus
  };

  const missingFieldsList = Object.entries(missingFields)
    .filter(([_, isMissing]) => isMissing)
    .map(([field]) => field);

  if (missingFieldsList.length > 0) {
    return res.status(400).json({
      message: `Missing required fields: ${missingFieldsList.join(', ')}`,
      missingFields
    });
  }

  // Title validation
  if (typeof title !== 'string') {
    return res.status(400).json({
      message: 'Course title must be a text value',
      field: 'title'
    });
  }
  if (title.length < 3) {
    return res.status(400).json({
      message: 'Course title must be at least 3 characters long',
      field: 'title'
    });
  }
  if (title.length > 100) {
    return res.status(400).json({
      message: 'Course title cannot exceed 100 characters',
      field: 'title'
    });
  }

  // Price validation
  if (typeof price !== 'number') {
    return res.status(400).json({
      message: 'Price must be a numeric value',
      field: 'price'
    });
  }
  if (price < 0) {
    return res.status(400).json({
      message: 'Price cannot be negative',
      field: 'price'
    });
  }

  // Discount validation
  if (discount) {
    if (typeof discount !== 'number') {
      return res.status(400).json({
        message: 'Discount must be a numeric value',
        field: 'discount'
      });
    }
    if (discount < 0) {
      return res.status(400).json({
        message: 'Discount cannot be negative',
        field: 'discount'
      });
    }
    if (discount > 100) {
      return res.status(400).json({
        message: 'Discount cannot exceed 100%',
        field: 'discount'
      });
    }
  }

  // Languages validation
  if (!Array.isArray(languages)) {
    return res.status(400).json({
      message: 'Languages must be provided as a list',
      field: 'languages'
    });
  }
  if (languages.length === 0) {
    return res.status(400).json({
      message: 'At least one language must be specified',
      field: 'languages'
    });
  }
  if (!languages.every(lang => typeof lang === 'string')) {
    return res.status(400).json({
      message: 'All languages must be text values',
      field: 'languages'
    });
  }

  // Status validation
  const validStatuses = ['active', 'archived'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      message: `Status must be either "active" or "archived" (received: ${status})`,
      field: 'status'
    });
  }

  // Certificate validation
  const validCertificates = ['yes', 'no', 'Yes', 'No'];
  if (!validCertificates.includes(certificate)) {
    return res.status(400).json({
      message: `Certificate must be either "yes" or "no" (received: ${certificate})`,
      field: 'certificate'
    });
  }

  // Hashtags validation
  if (hashtags) {
    if (!Array.isArray(hashtags)) {
      return res.status(400).json({
        message: 'Hashtags must be provided as a list',
        field: 'hashtags'
      });
    }
    if (!hashtags.every(tag => typeof tag === 'string')) {
      return res.status(400).json({
        message: 'All hashtags must be text values',
        field: 'hashtags'
      });
    }
  }

  // Syllabus validation
  if (!Array.isArray(syllabus)) {
    return res.status(400).json({
      message: 'Syllabus must be provided as a list of chapters',
      field: 'syllabus'
    });
  }
  if (syllabus.length === 0) {
    return res.status(400).json({
      message: 'Syllabus must contain at least one chapter',
      field: 'syllabus'
    });
  }

  // Validate each chapter in syllabus
  for (let i = 0; i < syllabus.length; i++) {
    const chapter = syllabus[i];
    
    if (!chapter.title || typeof chapter.title !== 'string') {
      return res.status(400).json({
        message: `Chapter ${i + 1} must have a title`,
        field: `syllabus[${i}].title`
      });
    }

    if (!Array.isArray(chapter.lessons)) {
      return res.status(400).json({
        message: `Chapter ${i + 1} must have a list of lessons`,
        field: `syllabus[${i}].lessons`
      });
    }

    if (chapter.lessons.length === 0) {
      return res.status(400).json({
        message: `Chapter ${i + 1} must have at least one lesson`,
        field: `syllabus[${i}].lessons`
      });
    }

    for (let j = 0; j < chapter.lessons.length; j++) {
      const lesson = chapter.lessons[j];
      if (!lesson.title || typeof lesson.title !== 'string') {
        return res.status(400).json({
          message: `Lesson ${j + 1} in Chapter ${i + 1} must have a title`,
          field: `syllabus[${i}].lessons[${j}].title`
        });
      }
    }
  }

  next();
};

module.exports = validateCourse; 