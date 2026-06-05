export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="footer" className="w-full py-10 text-center">
      <span className="text-xs text-muted-foreground">
        &copy; {currentYear} 석지인
      </span>
    </footer>
  )
}
