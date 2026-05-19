// Mock API mô phỏng backend - sinh viên KHÔNG cần sửa file này
// Sử dụng setTimeout để giả lập độ trễ mạng
// Dữ liệu khóa học mẫu

const mockCourses = [
  {
    id: 1,
    title: 'ReactJS từ cơ bản đến nâng cao',
    instructor: 'Nguyễn Văn A',
    price: 599000,
    level: 'Cơ bản',
    image: 'https://picsum.photos/seed/react/400/300',
    description: 'Khóa học ReactJS đầy đủ từ cơ bản đến nâng cao với các project thực tế. Bạn sẽ học hooks, redux, router, và nhiều kiến thức quan trọng khác.',
    duration: '20 giờ',
    students: 1250
  },
  {
    id: 2,
    title: 'NodeJS & Express API',
    instructor: 'Trần Thị B',
    price: 799000,
    level: 'Trung bình',
    image: 'https://picsum.photos/seed/node/400/300',
    description: 'Xây dựng RESTful API với NodeJS và Express. Khóa học bao gồm database, authentication, và deploy.',
    duration: '25 giờ',
    students: 890
  },
  {
    id: 3,
    title: 'TypeScript cho người mới',
    instructor: 'Lê Văn C',
    price: 499000,
    level: 'Cơ bản',
    image: 'https://picsum.photos/seed/ts/400/300',
    description: 'Học TypeScript một cách dễ hiểu, áp dụng cho dự án thực tế.',
    duration: '15 giờ',
    students: 2100
  },
  {
    id: 4,
    title: 'NextJS Full Stack',
    instructor: 'Phạm Thị D',
    price: 999000,
    level: 'Nâng cao',
    image: 'https://picsum.photos/seed/next/400/300',
    description: 'Xây dựng ứng dụng full stack với NextJS 14, App Router, Server Components.',
    duration: '30 giờ',
    students: 670
  },
  {
    id: 5,
    title: 'TailwindCSS Master',
    instructor: 'Hoàng Văn E',
    price: 399000,
    level: 'Cơ bản',
    image: 'https://picsum.photos/seed/tw/400/300',
    description: 'Thiết kế giao diện đẹp và responsive với TailwindCSS.',
    duration: '12 giờ',
    students: 1800
  },
  {
    id: 6,
    title: 'MongoDB & Mongoose',
    instructor: 'Đặng Thị F',
    price: 599000,
    level: 'Trung bình',
    image: 'https://picsum.photos/seed/mongo/400/300',
    description: 'Làm chủ NoSQL với MongoDB và Mongoose ODM.',
    duration: '18 giờ',
    students: 540
  },
  {
    id: 7,
    title: 'Docker & DevOps',
    instructor: 'Vũ Văn G',
    price: 899000,
    level: 'Nâng cao',
    image: 'https://picsum.photos/seed/docker/400/300',
    description: 'Container hóa ứng dụng với Docker, Docker Compose và CI/CD.',
    duration: '22 giờ',
    students: 320
  },
  {
    id: 8,
    title: 'GraphQL với Apollo',
    instructor: 'Bùi Thị H',
    price: 699000,
    level: 'Trung bình',
    image: 'https://picsum.photos/seed/gql/400/300',
    description: 'Xây dựng API hiện đại với GraphQL và Apollo Server/Client.',
    duration: '20 giờ',
    students: 410
  }
]

// Hàm helper giả lập delay mạng
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Lưu trữ dữ liệu trong memory (sẽ reset khi refresh)
let coursesData = [...mockCourses]
let nextId = 9

export const mockApi = {
  // GET /courses - lấy danh sách
  async getCourses() {
    await delay(600)
    return { data: coursesData }
  },

  // GET /courses/:id
  async getCourseById(id) {
    await delay(400)
    const course = coursesData.find(c => c.id === Number(id))
    if (!course) throw new Error('Không tìm thấy khóa học')
    return { data: course }
  },

  // POST /courses - thêm mới
  async createCourse(course) {
    await delay(500)
    const newCourse = {
      ...course,
      id: nextId++,
      students: 0,
      image: course.image || `https://picsum.photos/seed/${Date.now()}/400/300`
    }
    coursesData.push(newCourse)
    return { data: newCourse }
  },

  // DELETE /courses/:id
  async deleteCourse(id) {
    await delay(300)
    coursesData = coursesData.filter(c => c.id !== Number(id))
    return { data: { success: true } }
  }
}

// API URL giả - sinh viên có thể tham khảo nếu muốn dùng axios thật
// Trong đề thi, sử dụng mockApi ở trên hoặc tự fetch tới API này
export const API_BASE_URL = 'https://api.educourse-mock.com'
