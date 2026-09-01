import re

with open("src/components/AdminForms.tsx", "r") as f:
    content = f.read()

# Add Copy to lucide-react imports
content = content.replace(
    'import { Trash2, Plus, Edit2 } from "lucide-react";',
    'import { Trash2, Plus, Edit2, Copy } from "lucide-react";'
)

# AdminCamps modifications
content = content.replace(
    'const [editingCamp, setEditingCamp] = useState<any | null>(null);',
    'const [editingCamp, setEditingCamp] = useState<any | null>(null);\n  const [duplicatingCamp, setDuplicatingCamp] = useState<any | null>(null);'
)

content = content.replace(
    '''                   <td className="p-3 flex items-center gap-3">
                     <button onClick={() => setEditingCamp(c)} className="text-blue-500 hover:text-blue-700"><Edit2 className="w-4 h-4"/></button>
                     <button onClick={() => deleteCamp(c.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4"/></button>
                   </td>''',
    '''                   <td className="p-3 flex items-center gap-3">
                     <button onClick={() => setDuplicatingCamp(c)} className="text-green-500 hover:text-green-700" title="Duplicate"><Copy className="w-4 h-4"/></button>
                     <button onClick={() => setEditingCamp(c)} className="text-blue-500 hover:text-blue-700" title="Edit"><Edit2 className="w-4 h-4"/></button>
                     <button onClick={() => deleteCamp(c.id)} className="text-red-500 hover:text-red-700" title="Delete"><Trash2 className="w-4 h-4"/></button>
                   </td>'''
)

content = content.replace(
    '{editingCamp && <EditCampModal camp={editingCamp} onClose={() => setEditingCamp(null)} />}',
    '{editingCamp && <EditCampModal camp={editingCamp} onClose={() => setEditingCamp(null)} mode="edit" />}\n       {duplicatingCamp && <EditCampModal camp={duplicatingCamp} onClose={() => setDuplicatingCamp(null)} mode="duplicate" />}'
)


# AdminPackages modifications
content = content.replace(
    'const [editingPackage, setEditingPackage] = useState<any | null>(null);',
    'const [editingPackage, setEditingPackage] = useState<any | null>(null);\n  const [duplicatingPackage, setDuplicatingPackage] = useState<any | null>(null);'
)

content = content.replace(
    '''                   <td className="p-3 flex items-center gap-3">
                     <button onClick={() => setEditingPackage(p)} className="text-blue-500 hover:text-blue-700"><Edit2 className="w-4 h-4"/></button>
                     <button onClick={() => deletePackage(p.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4"/></button>
                   </td>''',
    '''                   <td className="p-3 flex items-center gap-3">
                     <button onClick={() => setDuplicatingPackage(p)} className="text-green-500 hover:text-green-700" title="Duplicate"><Copy className="w-4 h-4"/></button>
                     <button onClick={() => setEditingPackage(p)} className="text-blue-500 hover:text-blue-700" title="Edit"><Edit2 className="w-4 h-4"/></button>
                     <button onClick={() => deletePackage(p.id)} className="text-red-500 hover:text-red-700" title="Delete"><Trash2 className="w-4 h-4"/></button>
                   </td>'''
)

content = content.replace(
    '{editingPackage && <EditPackageModal pkg={editingPackage} onClose={() => setEditingPackage(null)} />}',
    '{editingPackage && <EditPackageModal pkg={editingPackage} onClose={() => setEditingPackage(null)} mode="edit" />}\n       {duplicatingPackage && <EditPackageModal pkg={duplicatingPackage} onClose={() => setDuplicatingPackage(null)} mode="duplicate" />}'
)

with open("src/components/AdminForms.tsx", "w") as f:
    f.write(content)
