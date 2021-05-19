
export function stepStatus(step, attachments, meetings, reviews = []) {
  const files = [];
  if (step.meeting) {
    (meetings || []).forEach(
      m => step.meeting === m.topic && m.attachments.forEach(a => files.push(a))
    );
  } else {
    Object.values(attachments || []).forEach(
        file => file.upload_type === step.uploadType && files.push(file)
    );
  }
  const filesListLength = step.uploadsList?.length || 1;

  if (step.uploadsList) {
      if (files.length >= step.uploadsList.length) {
          return { valid: true, complete: true, progress: 1 };
      }
      return { valid: false, complete: false, progress: parseFloat((files.length / filesListLength).toFixed(2)) };
  }
  if (step.uploadType) {
      if (!step.required) {
          return { valid: true, complete: files.length > 0 };
      }
      if (files.length > 0) {
          return { valid: true, complete: true, progress: 1 };
      }
      return { valid: false, complete: false, progress: 0 };
  }

  if (step.reviews) {
    let progress = 0;
    for (const j in step.reviews) {
      for (const k in reviews) {
        if (reviews[k].type !== step.reviews[j]) {
          continue;
        }
        if (reviews[k].approved) {
          progress++;
        }
        break;
      }
    }

    return { valid: false, complete: true, progress: parseFloat((progress / step.reviews.length).toFixed(2)) };
  }

  return { valid: !step.meeting, complete: !step.meeting };
}
