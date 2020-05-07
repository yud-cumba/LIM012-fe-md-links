const stats = (links) => {
  const uniqueLinks = [];
  links.forEach((link) => uniqueLinks.push(link.href));
  const stat = {
    total: links.length,
    unique: (uniqueLinks.filter((item, index, array) => array.indexOf(item) === index)).length,
  };
  return stat;
};

const validateStats = (links) => {
  const stat = stats(links);
  stat.broken = (links.filter((item) => item.status_text === 'fail')).length;
  return stat;
};

module.exports = { stats, validateStats };
