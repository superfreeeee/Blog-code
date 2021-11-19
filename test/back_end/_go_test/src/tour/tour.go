package tour

import (
	"fmt"
	"math"
	"runtime"
	"strings"
	"time"
)

func add(x, y int) int {
	return x + y
}

func swap(x string, y string) (string, string) {
	return y, x
}

func split(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return
}

func typeCase() {
	i := 42
	f := float64(i)
	u := uint(f)
	fmt.Printf("%v %v %v\n", i, f, u)
}

func constant() {
	const World = "世界"
	fmt.Println("Hello", World)
	fmt.Println("Happy", math.Pi, "Day")

	const Truth = true
	fmt.Println("Go rules?", Truth)
}

func loop() {
	sum := 0
	for i := 0; i < 10; i++ {
		sum += i
	}
	fmt.Println("sum 1 =", sum)

	sum = 1
	for sum < 1000 {
		sum += sum
	}
	fmt.Println("sum 2 =", sum)

	sum = 1
	for sum < 1000 {
		fmt.Println("sum 3 middle =", sum)
		sum *= 3
	}
	fmt.Println("sum 3 =", sum)
}

func sqrt(x float64) string {
	if x < 0 {
		return sqrt(-x) + "i"
	}
	return fmt.Sprint(math.Sqrt(x))
}

func pow(x, n, lim float64) float64 {
	if v := math.Pow(x, n); v < lim {
		return v
	} else {
		fmt.Printf("%g >= %g\n", v, lim)
	}
	return lim
}

func condition() {
	fmt.Println("condition - sqrt", sqrt(2), sqrt(-4))

	fmt.Println(
		"condition - pow",
		pow(3, 2, 10),
		pow(3, 3, 20),
	)
}

func Sqrt(x float64) float64 {
	prev := 1.0
	z := 1.0
	for {
		prev = z
		z -= (z*z - x) / (2 * z)
		if prev == z {
			return prev
		}
	}
}

func loopTest() {
	fmt.Println("sqrt(2) =", Sqrt(2))
	fmt.Println("sqrt(3) =", Sqrt(3))
	fmt.Println("sqrt(144) =", Sqrt(144))
}

func conditionSwitch() {
	fmt.Print("Go runs on ")
	switch os := runtime.GOOS; os {
	case "darwin":
		fmt.Println("OS X.")
	case "linux":
		fmt.Println("Linux.")
	default:
		// freebsd, openbsd,
		// plan9, windows...
		fmt.Printf("%s.\n", os)
	}

	fmt.Println("When's Saturday?")
	today := time.Now().Weekday()
	switch time.Saturday {
	case today + 0:
		fmt.Println("Today.")
	case today + 1:
		fmt.Println("Tomorrow.")
	case today + 2:
		fmt.Println("In two days.")
	default:
		fmt.Println("Too far away.")
	}

	t := time.Now()
	switch {
	case t.Hour() < 12:
		fmt.Println("Good morning!")
	case t.Hour() < 17:
		fmt.Println("Good afternoon.")
	default:
		fmt.Println("Good evening.")
	}
}

func deferExp1() {
	defer fmt.Println(" world")

	fmt.Print("hello")

}

func deferExp2() {
	fmt.Println("counting")

	for i := 0; i < 10; i++ {
		defer fmt.Println(i)
	}

	fmt.Println("done")
}

func deferExpression() {
	deferExp1()
	deferExp2()
}

func pointer() {
	i, j := 42, 2701

	p := &i                // 指向 i
	fmt.Println("i =", *p) // 通过指针读取 i 的值
	*p = 21                // 通过指针设置 i 的值
	fmt.Println("i =", i)  // 查看 i 的值
	fmt.Println("p =", p)  // 查看 i 的值

	p = &j                // 指向 j
	*p = *p / 37          // 通过指针对 j 进行除法运算
	fmt.Println("j =", j) // 查看 j 的值
	fmt.Println("p =", p) // 查看 i 的值
}

type Vertex struct {
	X int
	Y int
}

func structTest() {
	fmt.Println("Vertex", Vertex{1, 2})

	v := Vertex{1, 2}
	v.X = 4
	fmt.Println("Vertex", v)
	fmt.Println("X =", v.X)

	v = Vertex{1, 2}
	p := &v
	p.X = 1e9
	fmt.Println("Vertex", v)

	var (
		v1 = Vertex{1, 2}  // 创建一个 Vertex 类型的结构体
		v2 = Vertex{X: 1}  // Y:0 被隐式地赋予
		v3 = Vertex{}      // X:0 Y:0
		p2 = &Vertex{1, 2} // 创建一个 *Vertex 类型的结构体（指针）
	)
	fmt.Println(v1, v2, v3, p2)
}

func array() {
	var a [2]string
	a[0] = "Hello"
	a[1] = "World"
	fmt.Println(a[0], a[1])
	fmt.Println(a)
}

func arraySlice() {
	primes := [6]int{2, 3, 5, 7, 11, 13}
	fmt.Println(primes)

	var s []int = primes[1:4]
	fmt.Println(s)

	names := [4]string{
		"John",
		"Paul",
		"George",
		"Ringo",
	}
	fmt.Println("names =", names)

	n1 := names[0:2]
	n2 := names[1:3]
	fmt.Println(n1, n2)

	n2[0] = "XXX"
	fmt.Println(n1, n2)
	fmt.Println(names)

	q := []int{2, 3, 5, 7, 11, 13}
	fmt.Println("[]int =", q)

	r := []bool{true, false, true, true, false, true}
	fmt.Println("[]bool =", r)

	s2 := []struct {
		i int
		b bool
	}{
		{2, true},
		{3, false},
		{5, true},
		{7, true},
		{11, false},
		{13, true},
	}
	fmt.Println("[]{i int, b bool} = ", s2)
}

func arraySliceDefault() {
	s := []int{2, 3, 5, 7, 11, 13}

	s = s[1:4]
	fmt.Println("s =", s)

	s = s[:2]
	fmt.Println("s =", s)

	s = s[1:]
	fmt.Println("s =", s)
}

func printSlice(s []int) {
	fmt.Printf("len=%d cap=%d %v\n", len(s), cap(s), s)
}

func sliceAttr() {
	s := []int{2, 3, 5, 7, 11, 13}
	printSlice(s)

	// 截取切片使其长度为 0
	s = s[:0]
	printSlice(s)

	// 拓展其长度
	s = s[:4]
	printSlice(s)

	// 舍弃前两个值
	s = s[2:]
	printSlice(s)
}

func sliceNil() {
	var s []int
	fmt.Println(s, len(s), cap(s))
	if s == nil {
		fmt.Println("nil!")
	}
}

func printSlice2(s string, x []int) {
	fmt.Printf("%s len=%d cap=%d %v\n",
		s, len(x), cap(x), x)
}

func makeSlice() {
	a := make([]int, 5)
	printSlice2("a", a)

	b := make([]int, 0, 5)
	printSlice2("b", b)

	c := b[:2]
	printSlice2("c", c)

	d := c[2:5]
	printSlice2("d", d)
}

func multiSlice() {
	// 创建一个井字板（经典游戏）
	board := [][]string{
		[]string{"_", "_", "_"},
		[]string{"_", "_", "_"},
		[]string{"_", "_", "_"},
	}

	// 两个玩家轮流打上 X 和 O
	board[0][0] = "X"
	board[2][2] = "O"
	board[1][2] = "X"
	board[1][0] = "O"
	board[0][2] = "X"

	for i := 0; i < len(board); i++ {
		fmt.Printf("%s\n", strings.Join(board[i], " "))
	}
}

func appendSlice() {
	var s []int
	printSlice(s)

	// 添加一个空切片
	s = append(s, 0)
	printSlice(s)

	// 这个切片会按需增长
	s = append(s, 1)
	printSlice(s)

	// 可以一次性添加多个元素
	s = append(s, 2, 3, 4)
	printSlice(s)
}

func rangeIter() {
	var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}

	for i, v := range pow {
		fmt.Printf("2**%d = %d\n", i, v)
	}

	pow = make([]int, 10)
	for i := range pow {
		pow[i] = 1 << uint(i) // == 2**i
	}
	for _, value := range pow {
		fmt.Printf("%d\n", value)
	}
}

func Pic(pic [][]uint8, dx, dy int) [][]uint8 {
	rows := make([][]uint8, dx, dy)
	fmt.Println("rows =", rows, len(rows), cap(rows), len(rows[0]), cap(rows[0]))
	for i := 0; i < dy; i++ {
		rows[i] = pic[i][:dx]
	}
	fmt.Println("rows =", rows, len(rows), cap(rows), len(rows[0]), cap(rows[0]))
	return rows
}

func implPic() {
	pic := [][]uint8{
		{1, 1, 1, 1, 1},
		{2, 2, 2, 2, 2},
		{3, 3, 3, 3, 3},
		{4, 4, 4, 4, 4},
		{5, 5, 5, 5, 5},
	}
	fmt.Println(Pic(pic, 3, 3))
}

type Vertex2 struct {
	Lat, Long float64
}

func makeMap() {
	var m map[string]Vertex2

	m = make(map[string]Vertex2)
	m["Bell Labs"] = Vertex2{
		40.68433, -74.39967,
	}
	fmt.Println("map =", m)

	m = map[string]Vertex2{
		"Bell Labs": {40.68433, -74.39967},
		"Google":    {37.42202, -122.08408},
	}
	fmt.Println("map =", m)
}

func mapOpration() {
	m := make(map[string]int)

	m["Answer"] = 42
	fmt.Println("The value:", m["Answer"])

	m["Answer"] = 48
	fmt.Println("The value:", m["Answer"])

	delete(m, "Answer")
	fmt.Println("The value:", m["Answer"])

	v, ok := m["Answer"]
	fmt.Println("The value:", v, "Present?", ok)
}

func WordCount(s string) map[string]int {
	res := map[string]int{}
	strs := strings.Fields(s)
	for _, str := range strs {
		res[str]++
	}
	return res
}

func testWordCount() {
	fmt.Println(WordCount("1 2 3 4 5 4 3 2 1"))
	fmt.Println(WordCount("111 222 333 222 111 222 222 111 1111111"))
}

func compute(fn func(float64, float64) float64) float64 {
	return fn(3, 4)
}

func curryCompute(fn func(float64, float64) float64, x, y float64) float64 {
	return fn(x, y)
}

func hoc() {
	hypot := func(x, y float64) float64 {
		return math.Sqrt(x*x + y*y)
	}
	fmt.Println(hypot(5, 12))

	fmt.Println(compute(hypot))
	fmt.Println(compute(math.Pow))
	fmt.Println(curryCompute(math.Pow, 2, 10))
}

func adder() func(int) int {
	sum := 0
	return func(x int) int {
		sum += x
		return sum
	}
}

func closure() {
	pos, neg := adder(), adder()
	for i := 0; i < 10; i++ {
		fmt.Println(
			pos(i),
			neg(-2*i),
		)
	}
}

// 返回一个“返回int的函数”
func fibonacci() func() int {
	prev, next := 0, 1
	return func() int {
		prev, next = next, prev+next
		return next
	}
}

func fibonacciTest() {
	f := fibonacci()
	for i := 0; i < 10; i++ {
		fmt.Print(f(), " ")
	}
	fmt.Println()
}

type Vertex3 struct {
	X, Y float64
}

func (v Vertex3) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

type MyFloat float64

func (f MyFloat) Abs() float64 {
	if f < 0 {
		return float64(-f)
	}
	return float64(f)
}

func (v *Vertex3) Scale(f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

func Abs(v *Vertex3) float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func method() {
	v := Vertex3{3, 4}
	fmt.Println(v.Abs())

	f := MyFloat(-math.Sqrt2)
	fmt.Println(f.Abs())

	v = Vertex3{3, 4}
	fmt.Println("v =", v)
	v.Scale(10)
	fmt.Println("v =", v)
	fmt.Println(v.Abs())
	fmt.Println(Abs(&v))
	p := &v
	fmt.Println(p.Abs())
}

func Test() {
	//fmt.Println("pi = ", math.Pi)
	//fmt.Println(1, "+", 2, "=", add(1, 2))
	//
	//a, b := swap("123", "456")
	//fmt.Println("a =", a, ", b =", b)
	//
	//c, d := split(123)
	//fmt.Println("c =", c, ", d =", d)
	//
	//var e, g = 1, 2
	//fmt.Println("e =", e, ", g =", g)
	//
	//var i int
	//var f float64
	//var b2 bool
	//var s string
	//fmt.Printf("%v %v %v %q\n", i, f, b2, s)
	//
	//typeCase()
	//constant()
	//loop()
	//condition()
	//loopTest()
	//conditionSwitch()
	//deferExpression()
	//pointer()
	//structTest()
	//array()
	//arraySlice()
	//arraySliceDefault()
	//sliceAttr()
	//sliceNil()
	//makeSlice()
	//multiSlice()
	//appendSlice()
	//rangeIter()
	//implPic()
	//makeMap()
	//mapOpration()
	//testWordCount()
	//hoc()
	//closure()
	//fibonacciTest()
	method()
}
