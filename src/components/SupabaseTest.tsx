
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, CheckCircle, XCircle, Database } from 'lucide-react';

interface SchemaInfo {
  table_schema: string;
  table_name: string;
  row_count: number;
  has_rls: boolean;
  policies: Array<{
    policyname: string;
    permissive: boolean;
    roles: string[];
    cmd: string;
    qual: string;
    with_check: string;
  }>;
}

const SupabaseTest = () => {
  const [testStatus, setTestStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [tableInfo, setTableInfo] = useState<SchemaInfo[]>([]);

  const runTest = async () => {
    setTestStatus('loading');
    setErrorMessage(null);
    
    try {
      // Test 1: Verificar conectividad
      const { data: tables, error: tablesError } = await supabase
        .from('rls')
        .select('*')
        .limit(5);
      
      if (tablesError) {
        throw new Error(`Error al leer datos: ${tablesError.message}`);
      }
      
      // Test 2: Intentar insertar un registro
      const { data: insertData, error: insertError } = await supabase
        .from('rls')
        .insert({})
        .select();
      
      if (insertError) {
        throw new Error(`Error al insertar datos: ${insertError.message}`);
      }
      
      // Test 3: Intentar eliminar el registro insertado
      if (insertData && insertData.length > 0) {
        const { error: deleteError } = await supabase
          .from('rls')
          .delete()
          .eq('id', insertData[0].id);
        
        if (deleteError) {
          throw new Error(`Error al eliminar datos: ${deleteError.message}`);
        }
      }
      
      // Obtener información de tablas disponibles
      const { data: schemaInfo, error: schemaError } = await supabase
        .rpc('get_schema_info');
      
      if (schemaError) {
        throw new Error(`Error al obtener información del esquema: ${schemaError.message}`);
      }
      
      if (schemaInfo) {
        setTableInfo(schemaInfo);
      }
      
      setTestStatus('success');
    } catch (error) {
      console.error('Error en la prueba de Supabase:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Error desconocido');
      setTestStatus('error');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Prueba de Integración con Supabase
        </CardTitle>
        <CardDescription>
          Esta herramienta verifica la conexión y permisos de Supabase en tu aplicación
        </CardDescription>
      </CardHeader>
      <CardContent>
        {testStatus === 'idle' && (
          <p className="text-muted-foreground">
            Haz clic en el botón para verificar la conexión y los permisos de Supabase.
          </p>
        )}
        
        {testStatus === 'loading' && (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Ejecutando pruebas...</span>
          </div>
        )}
        
        {testStatus === 'success' && (
          <Alert className="bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-100">
            <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400" />
            <AlertTitle>¡Conexión exitosa!</AlertTitle>
            <AlertDescription>
              Tu aplicación puede leer y escribir datos en Supabase correctamente.
              {tableInfo.length > 0 && (
                <div className="mt-2">
                  <p className="font-semibold">Tablas disponibles:</p>
                  <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                    {tableInfo.map((table, index) => (
                      <li key={index}>
                        {table.table_name} ({table.row_count} filas)
                        {table.has_rls && ' - RLS activado'}
                        {table.policies.length > 0 && (
                          <ul className="ml-4 list-circle text-xs mt-1">
                            {table.policies.map((policy, pIndex) => (
                              <li key={pIndex}>
                                {policy.policyname} ({policy.cmd})
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}
        
        {testStatus === 'error' && (
          <Alert className="bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-100">
            <XCircle className="h-4 w-4 text-red-500 dark:text-red-400" />
            <AlertTitle>Error de conexión</AlertTitle>
            <AlertDescription>
              Se encontró un problema al interactuar con Supabase:
              <p className="font-mono text-sm bg-red-100 dark:bg-red-800 p-2 rounded mt-2">
                {errorMessage}
              </p>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={runTest} 
          disabled={testStatus === 'loading'}
          variant={testStatus === 'error' ? "destructive" : "default"}
        >
          {testStatus === 'loading' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {testStatus === 'idle' && 'Verificar conexión con Supabase'}
          {testStatus === 'loading' && 'Verificando...'}
          {testStatus === 'success' && 'Verificar de nuevo'}
          {testStatus === 'error' && 'Reintentar'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SupabaseTest;
