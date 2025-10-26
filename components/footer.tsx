export function Footer() {
  const currentYear = new Date().getFullYear()
  const startYear = 2024
  const yearRange = startYear === currentYear ? currentYear : `${startYear} - ${currentYear}`

  return (
    <footer className="border-t bg-background py-6 mt-auto">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>© {yearRange} R2C Automações. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
