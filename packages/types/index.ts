// A interface principal que será usada tanto no backend quanto no frontend.
export interface FileItem {
  id: string;
  title: string;
  type: "Folder";
  modified: string;      // No futuro, pode ser um tipo Date, mas string funciona para começar.
  sizeTotal?: string;    // Opcional, pois pastas não têm tamanho.
  shared?: boolean;      // Opcional.
  starred?: boolean;     // Opcional.
}

export interface FileCardProps {
  title: string
  type: "Folder"
  size?: string
  modified: string
  shared?: boolean
  starred?: boolean
  onClick?: () => void
}

