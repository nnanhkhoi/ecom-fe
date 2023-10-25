import axios from 'axios'
// const baseUrl = 'http://localhost:3003/api/category'
const baseUrl = '/v1/api/category'
axios.defaults.withCredentials = true

export const menuItems = [
  {
    title: 'Home',
    link: '/',
  },
  {
    title: 'Categories',
    link: '/products',
    submenu: [
      {
        title: 'web design',
      },
      {
        title: 'web development',
        submenu: [
          {
            title: 'Frontend',
          },
          {
            title: 'Backend',
            submenu: [
              {
                title: 'NodeJS',
              },
              {
                title: 'PHP',
              },
            ],
          },
        ],
      },
      {
        title: 'SEO',
      },
    ],
  },
  {
    title: 'About',
    submenu: [
      {
        title: 'Who we are',
      },
      {
        title: 'Our values',
      },
    ],
  },
]

const getCategory = async () => {
  const response = await axios.get(baseUrl)
  return response.data.metadata
}

const nestCategories = (categories) => {
  const nestedCategories = []
  const categoryMap = {}

  categories.forEach((category) => {
    category.submenu = []
    categoryMap[category.id] = category
    const parent = category.parent_id ? categoryMap[category.parent_id] : null

    if (parent) {
      parent.submenu.push(category)
    } else {
      nestedCategories.push(category)
    }
  })

  return nestedCategories
}

export const getCategoryMenu = async () => {
  const categories = await getCategory()
  const nestedCategories = nestCategories(categories)

  const processCategory = (category) => {
    const { id, parent_id, title, submenu } = category

    const link = `category/${title
      .toLowerCase()
      .replace(/'/g, '')
      .replace(/\s/g, '')}`

    const categoryItem = {
      id,
      parent_id,
      title,
      link,
    }

    if (submenu && submenu.length > 0) {
      categoryItem.submenu = submenu.map(processCategory)
    }

    return categoryItem
  }

  const filteredCategories = nestedCategories.map(processCategory)

  return filteredCategories
}
